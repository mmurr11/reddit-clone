"use strict";
exports.id = 680;
exports.ids = [680];
exports.modules = {

/***/ 5680:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "A": () => (/* binding */ Layout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(8930);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: ./src/generated/graphql.tsx
var graphql = __webpack_require__(9402);
// EXTERNAL MODULE: ./src/utils/isServer.ts
var isServer = __webpack_require__(7786);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./src/components/NavBar.tsx






const NavBar = ({})=>{
    const router = (0,router_.useRouter)();
    const [{ data , fetching  }] = (0,graphql/* useMeQuery */.UE)({
        pause: (0,isServer/* isServer */.s)()
    });
    const [{ fetching: logoutFethcing  }, logout] = (0,graphql/* useLogoutMutation */._y)();
    let body = null;
    // data is loading
    if (fetching) {
    // user not logged in
    } else if (!(data === null || data === void 0 ? void 0 : data.me)) {
        body = /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                    href: "/login",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Link, {
                        mr: 2,
                        children: "Login"
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                    href: "/register",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Link, {
                        children: "Register"
                    })
                })
            ]
        });
    // user is logged in
    } else {
        body = /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
            align: "center",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                    href: "/create-post",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                        as: react_.Link,
                        mr: 4,
                        children: "create post"
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
                    mr: 2,
                    children: data.me.username
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                    onClick: async ()=>{
                        await logout();
                        router.reload();
                    },
                    isLoading: logoutFethcing,
                    variant: "link",
                    children: "Logout"
                })
            ]
        });
    }
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
        position: "sticky",
        top: 0,
        zIndex: 1,
        bg: "tomato",
        p: 4,
        align: "center",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                href: "/",
                children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Link, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Heading, {
                        children: "It's Reddit!"
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
                ml: "auto",
                children: body
            })
        ]
    }));
};

// EXTERNAL MODULE: ./src/components/Wrapper.tsx
var Wrapper = __webpack_require__(9113);
;// CONCATENATED MODULE: ./src/components/Layout.tsx



const Layout = ({ children , variant  })=>{
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(NavBar, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(Wrapper/* Wrapper */.i, {
                variant: variant,
                children: children
            })
        ]
    }));
};


/***/ })

};
;