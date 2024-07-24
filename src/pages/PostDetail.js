import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Post from '../components/Post';
import Comments from "../components/Comments";
import { useSelector, useDispatch } from "react-redux";
import { getPostDetail } from "../store";

function PostDetail() {
    const { postNo } = useParams(); // URL 파라미터에서 postNo 추출
    const dispatch = useDispatch();
    const postDetail = useSelector((state) => state.postDetail)
    const [comments, setComments] = useState([]);

    const getPost = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/posts/${postNo}`);
            dispatch(getPostDetail(res.data));
            setComments(res.data.comments); // 댓글 목록 설정
        } catch (err) {
            console.error("게시물 가져오기 오류:", err);
        }
    };

  
    useEffect(() => {
        if (postNo) {
            getPost();
        }
    }, [postNo, dispatch]);

    return (
        
        <div>
            <Post 
                title={postDetail.title} 
                createdAt={postDetail.createdAt} 
                username={postDetail.username}
                content={postDetail.content} 
                likesCount={postDetail.likesCount} 
                comments={comments} // 댓글 데이터 전달
                postNo={postNo} // 댓글 작성 시 필요
            />
            
            <Comments 
                comments={comments} 
                postNo={postNo} 
                setComments={setComments} 
            />

        </div>
    );
}

export default PostDetail;
