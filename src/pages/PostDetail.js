import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Post from '../components/Post';
import { useSelector, useDispatch } from "react-redux";
import { getPostDetail } from "../store";

function PostDetail() {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const postDetail = useSelector((state) => state.postDetail)

    const getPost = async () => {
        try {
            const res = await axios.get(`/posts/${postId}`);
            dispatch(getPostDetail(res.data));
        } catch (err) {
            console.error("게시물 가져오기 오류:", err);
        }
    };

    useEffect(() => {
        getPost();
    }, [postId]); // postId가 변경될 때마다 호출

    return (
        <div>
            <Post 
                title={postDetail.title} 
                createdAt={postDetail.createdAt} 
                username={postDetail.username}
                content={postDetail.content} 
                likes={postDetail.likes} 
                comments={postDetail.comments} 
            />
        </div>
    );
}

export default PostDetail;
