import { Resolver, Mutation, Arg, Field, Ctx, ObjectType, Query, Root, FieldResolver } from 'type-graphql'
import { MyContext } from 'src/types'
import { User } from '../entities/User'
import argon2 from 'argon2'
import { UsernamePasswordInput } from './UsernamePasswordInput';
import { validateRegister } from '../utils/validateRegister';
import { sendEmail } from '../utils/sendEmail';
import { v4 } from 'uuid'
import { FORGET_PASSWORD_PREFIX, COOKIE_NAME } from '../constants';
import { getConnection } from 'typeorm';

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable:true})
    errors?: FieldError[]

    @Field(() => User, {nullable:true})
    user?: User
}

@Resolver(User)
export class UserResolver {

    @FieldResolver(() => String)
    email(@Root() user: User, @Ctx() {req}: MyContext) {
        // this is the current user and its okay to show them their email
        if (req.session.userId === user.id) {
            return user.email
        }

        // current user is not the owner of this post
        return ""
    }

    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() {redis, req}: MyContext
    ): Promise<UserResponse> {

        if (newPassword.length <= 2) {
            return { errors: [
                {
                    field: "newPassword",
                    message: "length must be greater than 2"
                }
            ]}
        }

        const key =  FORGET_PASSWORD_PREFIX+token  
        const userId = await redis.get(key)

        if (!userId) {
            
            return { errors: [
                {
                    field: "token",
                    message: "token expired"
                }
            ]}
        }

        const userIdNum = parseInt(userId)
        const user = await User.findOne(userIdNum)

        if (!user) {
            return { errors: [
                {
                    field: "token",
                    message: "user no longer exists"
                }
            ]}
        }

        User.update({id: userIdNum}, {password: await argon2.hash(newPassword)})
        redis.del(key)
        req.session.userId = user.id
        return { user }

    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() {redis} : MyContext
    ) {
        const user = await User.findOne({where: {email}})
        if (!user) {
            // email is not in db
            return true
        }

        const token = v4() 
        await redis.set(FORGET_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 24 * 3) // 3 days
        await sendEmail(email, `<a href="http://localhost:3000/change-password/${token}">reset password</a>`)

        return true
    }

    @Query(() => User, {nullable: true})
    me(@Ctx() { req } : MyContext) {
        // user is not logged in
        if (!req.session.userId) {
            return null
        }

        return User.findOne(req.session.userId)
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { req }: MyContext
        ): Promise<UserResponse> {
            const errors = validateRegister(options)
            if (errors) {
                return { errors }
            }
            const hashedPassword = await argon2.hash(options.password)
            let user
            try {
                
                 const result = await getConnection().createQueryBuilder().insert().into(User).values({
                    username: options.username,
                    password: hashedPassword,
                    email: options.email
                }).returning('*').execute()
                user = result.raw[0]
            } catch (err) {
                console.log(err)
                if (err.detail.includes("already exists")) {
                    // duplicate username error
                    return {
                        errors: [{
                            field: "username",
                            message: "username already taken"
                        }]
                    }
                }
            }

            // store user id session
            // keep cookie on user
            // keep user logged in
            req.session.userId = user.id

        return {
            user
        }
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("usernameOrEmail") usernameOrEmail: string,
        @Arg("password") password: string,
        @Ctx() { req }: MyContext
        ): Promise<UserResponse> {
        const user = await User.findOne( 
            usernameOrEmail.includes('@')
            ? { where: { email: usernameOrEmail } }
            : { where: { username: usernameOrEmail } }
        )
        if (!user) {
            return {
                errors: [{
                    field: 'usernameOrEmail',
                    message: "that username or email doesn't exist"
                }]
            }
        }
        const valid = await argon2.verify(user.password, password)
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "incorrect password"
                    }
                ]
            }
        }

        req.session.userId = user.id

        return {
            user
        }

    }

    @Mutation(() => Boolean)
    logout(
        @Ctx() {req, res}: MyContext
    ) {
        return new Promise((resolve) => req.session.destroy(err => {
            res.clearCookie(COOKIE_NAME)
            if (err) {
                resolve(false)
                console.log(err)
                return
            }
            resolve(true)
        }))
    }

}

