import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Comments from './Comments';
import { useSelector } from "react-redux";

function Post({ title, createdAt, username, content, likes, comments }) {
    const [totalLikes, setTotalLikes] = useState(likes);
    const { postId } = useParams();
    const userName = useSelector((state) => state.user);
    const currentUserName = userName.username;
    const navigate = useNavigate();

    const handleLike = async () => {
        try {
            await axios.post(`/posts/${postId}/like`, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                  }
            });
            setTotalLikes(totalLikes + 1);
        } catch (err) {
            console.error("좋아요 오류:", err);
        }
    };

    const handleDelete = async () => {  // 게시물 삭제
        try {
            await fetch(`/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
            });
            alert('게시물이 삭제되었습니다.');
            navigate("/home");
        } catch (err) {
            console.error("게시물 삭제 오류: ", err);
        }
    };

    return (
        <div>
            <h2>{title}</h2>
            <h5>{username}</h5>
            <p>{createdAt}</p>
            <Link to={`/posts/${postId}/edit`}>
                <button>수정</button>
            </Link>
            <button onClick={handleDelete}>삭제</button>
            <hr />
            <p>{content}</p>
            <h6 onClick={handleLike}>좋아요 {totalLikes} </h6>
            <hr />
            <h6>댓글</h6>
            <Comments comments={comments} />
        </div>
    );
}

export default Post;
