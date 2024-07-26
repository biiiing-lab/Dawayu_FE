import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({    // 현재 로그인한 사용자
    name: "user",
    initialState: {
        userId: "",
    },
    reducers: {
       loginUser(state, action){
        state.userId = action.payload;
       },
       clearUser(state){
        state.userId = "";
       }
    }
});

export let { loginUser, clearUser } = user.actions

let post = createSlice({
    name: "post",
    initialState: {
        title: "",
        content: "",
        username: ""
    },
    reducers: {
        changeTitle(state, action){
            state.title = action.payload;
        },
        changeContent(state, action){
            state.content = action.payload;
        },
        changeUserName(state, action){
            state.content = action.payload
        }
    }
})

export let { changeTitle, changeContent, changeUserName } = post.actions

let postDetail = createSlice({
    name: "postDetail",
    initialState: {
        title: '',
        createdAt: '',
        username: '',
        content: '',
        likesCount: 0,
        comments: []
    },
    reducers: {
        getPostDetail(state, action){
            state.title = action.payload.title;
            state.createdAt = action.payload.createdAt;
            state.username = action.payload.username;
            state.content = action.payload.content;
            state.likesCount = action.payload.likesCount;
            state.comments = action.payload.comments;
           }
        }
    })

export let { getPostDetail } = postDetail.actions

let userInfo = createSlice({
    name: "userInfo",
    initialState: {
        posts: [],
        likedPosts: []
    },
    reducers: {
        addPosts(state, action){
            state.posts = action.payload;
        },
        addLikedPosts(state, action){
            state.likedPosts = action.payload;
        }
    }      
})

export let { addPosts, addLikedPosts } = userInfo.actions;


export default configureStore({
  reducer: { 
    user: user.reducer,
    post: post.reducer,
    userInfo: userInfo.reducer,
    postDetail: postDetail.reducer
  }
})
