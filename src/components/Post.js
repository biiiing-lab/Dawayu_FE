import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import Comments from './Comments';
import { useSelector, useDispatch } from "react-redux";
import usePostDeleteFunc from "../functions/postDeleteFunc";
import Edit from "../pages/Edit";
import { addLikedPosts } from "../store";

function Post({ title, createdAt, username, content, likesCount, comments, postNo }) {
    const userName = useSelector((state) => state.user);
    const userInfo = useSelector((state) => state.userInfo);
    const deletePost = usePostDeleteFunc();
    const [likes, setLikes] = useState(likesCount);
    const [isliked, setIsLiked] = useState(false);
    const dispatch = useDispatch();

    const addLike = async () => {
        try {
            await axios.post(`http://localhost:8080/posts/${postNo}/like`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('message')}`,
                  }
            });
            setLikes(likes+1);

        } catch (err) {
            console.error("좋아요 오류:", err);
        }
    };

    const disLike = () => { // 비동기 어쩌고 에러 나서 async await 빼고 작성
        axios.post(`http://localhost:8080/posts/${postNo}/dislike`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('message')}`,
                }
            }).then(
                setLikes(likes-1)
            ).catch((err) => {
            console.error("좋아요 오류:", err);
        })
    };

    const handlelike = () => {
        if (localStorage.getItem('message') === null) {
            alert("로그인을 해주세요."); 
        } else {
            if (!isliked) {
                addLike();
            } else {
                disLike();
            }
            setIsLiked(!isliked);
    }};

    // 새로고침 시 좋아요 또 누를 수 있는 것 방지
    // useEffect(() => {
    //     axios.get('http://localhost:8080/auth/mypage', {
    //         headers: {
    //              Authorization: `Bearer ${localStorage.getItem('message')}`
    //         }
    //     })
    //     .then((res) => {
    //         dispatch(addLikedPosts(res.data.likedPosts));
    //         if (userInfo.likedPosts.some((item) => item.title === title)) {
    //             setIsLiked(true);
    //         } else {
    //             setIsLiked(false);
    //         };
    //     })
    //     .catch((err) => {
    //         console.error('데이터 가져오기 에러:', err);
    //     });
    // }, [isliked]);


    return (
        <div>
            <h2>{title}</h2>
            <h5>{username}</h5>
            <p>{new Date(createdAt).toLocaleString()}</p>
            <Link to={`/posts/${postNo}/edit`}> 
                <button>수정</button> 
            </Link>
            <button onClick={() => deletePost(postNo)}>삭제</button>
            <hr />
            <p>{content}</p>
            <h6 onClick={handlelike}>좋아요 {likes}</h6>
            <hr />
        </div>
    );
}

export default Post;
