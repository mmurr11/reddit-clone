"use strict";
exports.id = 863;
exports.ids = [863];
exports.modules = {

/***/ 9113:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": () => (/* binding */ Wrapper)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__);


const Wrapper = ({ children , variant ="medium" ,  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
        mt: 8,
        mx: "auto",
        maxW: variant === "medium" ? "800px" : "400px",
        w: "100%",
        children: children
    }));
};


/***/ }),

/***/ 9402:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$h": () => (/* binding */ useChangePasswordMutation),
/* harmony export */   "u3": () => (/* binding */ useCreatePostMutation),
/* harmony export */   "jn": () => (/* binding */ useDeletePostMutation),
/* harmony export */   "zN": () => (/* binding */ useForgotPasswordMutation),
/* harmony export */   "YA": () => (/* binding */ useLoginMutation),
/* harmony export */   "_y": () => (/* binding */ useLogoutMutation),
/* harmony export */   "l4": () => (/* binding */ useRegisterMutation),
/* harmony export */   "Bq": () => (/* binding */ useUpdatePostMutation),
/* harmony export */   "ot": () => (/* binding */ useVoteMutation),
/* harmony export */   "en": () => (/* binding */ MeDocument),
/* harmony export */   "UE": () => (/* binding */ useMeQuery),
/* harmony export */   "Ss": () => (/* binding */ usePostQuery),
/* harmony export */   "Bm": () => (/* binding */ usePostsQuery)
/* harmony export */ });
/* unused harmony exports PostSnippetFragmentDoc, RegularErrorFragmentDoc, RegularUserFragmentDoc, RegularUserResponseFragmentDoc, ChangePasswordDocument, CreatePostDocument, DeletePostDocument, ForgotPasswordDocument, LoginDocument, LogoutDocument, RegisterDocument, UpdatePostDocument, VoteDocument, PostDocument, PostsDocument */
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(825);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2977);
/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(urql__WEBPACK_IMPORTED_MODULE_1__);


const PostSnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  fragment PostSnippet on Post {
    id
    createdAt
    updatedAt
    title
    textSnippet
    points
    voteStatus
    creator {
      username
      id
    }
  }
`;
const RegularErrorFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  fragment RegularError on FieldError {
    field
    message
  }
`;
const RegularUserFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  fragment RegularUser on User {
    id
    username
  }
`;
const RegularUserResponseFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
const ChangePasswordDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
function useChangePasswordMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(ChangePasswordDocument);
}
const CreatePostDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
      createdAt
      updatedAt
      title
      text
      points
      creatorId
    }
  }
`;
function useCreatePostMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(CreatePostDocument);
}
const DeletePostDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;
function useDeletePostMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(DeletePostDocument);
}
const ForgotPasswordDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
function useForgotPasswordMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(ForgotPasswordDocument);
}
const LoginDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
function useLoginMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(LoginDocument);
}
const LogoutDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  mutation Logout {
    logout
  }
`;
function useLogoutMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(LogoutDocument);
}
const RegisterDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
function useRegisterMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(RegisterDocument);
}
const UpdatePostDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  mutation UpdatePost($id: Int!, $title: String!, $text: String!) {
    updatePost(id: $id, title: $title, text: $text) {
      id
      title
      text
      textSnippet
    }
  }
`;
function useUpdatePostMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(UpdatePostDocument);
}
const VoteDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  mutation Vote($value: Int!, $postId: Int!) {
    vote(value: $value, postId: $postId)
  }
`;
function useVoteMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(VoteDocument);
}
const MeDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query Me {
    me {
      id
      username
    }
  }
`;
function useMeQuery(options) {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useQuery({
        query: MeDocument,
        ...options
    });
}
const PostDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query Post($id: Int!) {
    post(id: $id) {
      id
      createdAt
      updatedAt
      title
      points
      text
      voteStatus
      creator {
        id
        username
      }
    }
  }
`;
function usePostQuery(options) {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useQuery({
        query: PostDocument,
        ...options
    });
}
const PostsDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query Posts($limit: Int!, $cursor: String) {
    posts(cursor: $cursor, limit: $limit) {
      hasMore
      posts {
        ...PostSnippet
      }
    }
  }
  ${PostSnippetFragmentDoc}
`;
function usePostsQuery(options) {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useQuery({
        query: PostsDocument,
        ...options
    });
}


/***/ }),

/***/ 9012:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": () => (/* binding */ betterUpdateQuery)
/* harmony export */ });
function betterUpdateQuery(cache, qi, result, fn) {
    return cache.updateQuery(qi, (data)=>fn(result, data)
    );
}


/***/ }),

/***/ 4711:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MS": () => (/* binding */ createUrqlClient)
/* harmony export */ });
/* unused harmony exports errorExchange, cursorPagination */
/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2977);
/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urql__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _generated_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9402);
/* harmony import */ var _betterUpdateQuery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9012);
/* harmony import */ var _urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9352);
/* harmony import */ var wonka__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3342);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _isServer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7786);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(825);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_2__, wonka__WEBPACK_IMPORTED_MODULE_3__]);
([_urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_2__, wonka__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const errorExchange = ({ forward  })=>{
    return (ops$)=>{
        return (0,wonka__WEBPACK_IMPORTED_MODULE_3__.pipe)(forward(ops$), (0,wonka__WEBPACK_IMPORTED_MODULE_3__.tap)(({ error  })=>{
            if (error === null || error === void 0 ? void 0 : error.message.includes('not authenticated')) {
                next_router__WEBPACK_IMPORTED_MODULE_4___default().replace('/login');
            }
        }));
    };
};
const cursorPagination = ()=>{
    return (_parent, fieldArgs, cache, info1)=>{
        const { parentKey: entityKey , fieldName  } = info1;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter((info)=>info.fieldName === fieldName
        );
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }
        const fieldKey = `${fieldName}(${(0,urql__WEBPACK_IMPORTED_MODULE_0__.stringifyVariables)(fieldArgs)})`;
        const isItInTheCache = cache.resolve(cache.resolveFieldByKey(entityKey, fieldKey), 'posts');
        info1.partial = !isItInTheCache;
        let hasMore = true;
        const results = [];
        fieldInfos.forEach((fi)=>{
            const key = cache.resolveFieldByKey(entityKey, fi.fieldKey);
            const data = cache.resolve(key, 'posts');
            const _hasMore = cache.resolve(key, 'hasMore');
            if (!_hasMore) {
                hasMore = _hasMore;
            }
            results.push(...data);
        });
        return {
            __typename: 'PaginatedPosts',
            hasMore,
            posts: results
        };
    };
};
const invalidateAllPosts = (cache)=>{
    const allFields = cache.inspectFields('Query');
    const fieldInfos = allFields.filter((info)=>info.fieldName === 'posts'
    );
    fieldInfos.forEach((fi)=>{
        cache.invalidate('Query', 'posts', fi.arguments || {});
    });
};
const createUrqlClient = (ssrExchange, ctx)=>{
    let cookie = '';
    if ((0,_isServer__WEBPACK_IMPORTED_MODULE_6__/* .isServer */ .s)()) {
        var ref, ref1;
        cookie = ctx === null || ctx === void 0 ? void 0 : (ref = ctx.req) === null || ref === void 0 ? void 0 : (ref1 = ref.headers) === null || ref1 === void 0 ? void 0 : ref1.cookie;
    }
    console.log('api url is: ', "http://localhost:4000/graphql");
    return {
        url: "http://localhost:4000/graphql",
        fetchOptions: {
            credentials: "include",
            headers: cookie ? {
                cookie
            } : undefined
        },
        exchanges: [
            urql__WEBPACK_IMPORTED_MODULE_0__.dedupExchange,
            (0,_urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_2__.cacheExchange)({
                keys: {
                    PaginatedPosts: ()=>null
                },
                resolvers: {
                    Query: {
                        posts: cursorPagination()
                    }
                },
                updates: {
                    Mutation: {
                        deletePost: (_result, args, cache, info)=>{
                            cache.invalidate({
                                __typename: "Post",
                                id: args.id
                            });
                        },
                        vote: (_result, args, cache, info)=>{
                            const { postId , value  } = args;
                            const data = cache.readFragment((graphql_tag__WEBPACK_IMPORTED_MODULE_5___default())`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `, {
                                id: postId
                            });
                            console.log('data', data);
                            if (data) {
                                if (data.voteStatus === value) {
                                    return;
                                }
                                // if voteStatus is true, if vote is changed, +/- 2 to the points
                                const newPoints = data.points + (!data.voteStatus ? 1 : 2) * value;
                                cache.writeFragment((graphql_tag__WEBPACK_IMPORTED_MODULE_5___default())`

                  fragment __ on Post {
                    points
                    voteStatus
                  }
                  `, {
                                    id: postId,
                                    points: newPoints,
                                    voteStatus: value
                                });
                            }
                        },
                        createPost: (_result, args, cache, info)=>{
                            invalidateAllPosts(cache);
                        },
                        logout: (_result, args, cache, info)=>{
                            (0,_betterUpdateQuery__WEBPACK_IMPORTED_MODULE_7__/* .betterUpdateQuery */ .U)(cache, {
                                query: _generated_graphql__WEBPACK_IMPORTED_MODULE_1__/* .MeDocument */ .en
                            }, _result, ()=>({
                                    me: null
                                })
                            );
                        },
                        login: (_result, args, cache, info)=>{
                            (0,_betterUpdateQuery__WEBPACK_IMPORTED_MODULE_7__/* .betterUpdateQuery */ .U)(cache, {
                                query: _generated_graphql__WEBPACK_IMPORTED_MODULE_1__/* .MeDocument */ .en
                            }, _result, (result, query)=>{
                                if (result.login.errors) {
                                    return query;
                                } else {
                                    return {
                                        me: result.login.user
                                    };
                                }
                            });
                            invalidateAllPosts(cache);
                        },
                        register: (_result, args, cache, info)=>{
                            (0,_betterUpdateQuery__WEBPACK_IMPORTED_MODULE_7__/* .betterUpdateQuery */ .U)(cache, {
                                query: _generated_graphql__WEBPACK_IMPORTED_MODULE_1__/* .MeDocument */ .en
                            }, _result, (result, query)=>{
                                if (result.register.errors) {
                                    return query;
                                } else {
                                    return {
                                        me: result.register.user
                                    };
                                }
                            });
                        }
                    }
                }
            }),
            errorExchange,
            ssrExchange,
            urql__WEBPACK_IMPORTED_MODULE_0__.fetchExchange, 
        ]
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7786:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ isServer)
/* harmony export */ });
const isServer = ()=>"undefined" === 'undefined'
;


/***/ })

};
;