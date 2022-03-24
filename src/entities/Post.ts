import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Post {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;


    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;


    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;


    @Field()
    @Column()
    title!: string;    
}