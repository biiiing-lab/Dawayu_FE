import { post } from '../store.js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeTitle, changeContent, changeUserName, user } from '../store.js';
import { useEffect } from 'react';

function Write(){
    const post = useSelector((state) => state.post)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const publish = () => {
        axios.post('http://localhost:8080/posts', post, {
            headers: {
                Authorization: localStorage.getItem('message')
            }
        })
        .then((res) => {
            const postId = res.data.postId;
            navigate(`http://localhost:8080/posts/${postId}`);
        })
        .catch(error => {
            console.error('게시물 발행 오류:', error);
        });
    };

    useEffect(() => {
        if (!localStorage.getItem('message')) {
            alert("로그인을 해주세요.");
            navigate('/login');
        } else {
            dispatch(changeUserName(user.username));
        }
    }, []);

    return (
            <div className="wrapper">
                <div className="body">
                    <input type="text" placeholder="제목" onChange={(e) => dispatch(changeTitle(e.target.value))}/>
                    <hr />
                    <textarea onChange={(e) => dispatch(changeContent(e.target.value))}></textarea>
                    <br />
                    <button onClick={publish}>발행</button>
                </div>
            </div>
    )
}

export default Write;