import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import Comments from './Comments';
import { useSelector } from "react-redux";
import postDeleteFunc from "../functions/postDeleteFunc";

function Post({ title, createdAt, username, content, likes, comments }) {
    const [totalLikes, setTotalLikes] = useState(likes);
    const { postId } = useParams();
    const userName = useSelector((state) => state.user);
    const currentUserName = userName.username;  // 좋아요 전송 시 username도 함께 보내야 하는지

    const handleLike = async () => {
        try {
            await axios.post(`/posts/${postId}/like`, null, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                  }
            });
            setTotalLikes(totalLikes + 1);
        } catch (err) {
            console.error("좋아요 오류:", err);
        }
    };  /* 서버에서 좋아요 수를 가져오고 좋아요가 증가할 경우 서버로 데이터를 보내는 추가 로직 작성 필요.
        이때 username이랑 좋아요 수를 보내면 되는지? */


    return (
        <div>
            <h2>{title}</h2>
            <h5>{username}</h5>
            <p>{createdAt}</p>
            <Link to={`/posts/${postId}/edit`}>
                <button>수정</button>
            </Link>
            <button onClick={postDeleteFunc}>삭제</button>
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
