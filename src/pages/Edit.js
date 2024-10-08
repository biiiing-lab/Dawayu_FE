import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { changeTitle, changeContent } from '../store';

function Edit() {
    const { postNo } = useParams();
    const post = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('message')) {
            alert("로그인을 해주세요.")
            navigate('/login')
        } else {
            axios.get(`http://localhost:8080/posts/${postNo}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('message')}`
                }
            })
            .then((response) => {
                const { title, content } = response.data;
                dispatch(changeTitle(title));
                dispatch(changeContent(content));
            })
            .catch((error) => {
                console.error('게시물 가져오기 오류:', error);
            });
    }}, [postNo, dispatch, navigate]);

    const publish = () => {
        axios.put(`http://localhost:8080/posts/${postNo}`, {
            title: post.title,
            content: post.content
        },
        { headers: {
             Authorization: `Bearer ${localStorage.getItem('message')}`
        }
        }).then(() => {
            alert("게시물 수정이 완료되었습니다.")
            navigate(`/posts/${postNo}`);
        }).catch((error) => {
            console.error('게시물 수정 오류:', error);
        });
    };

    return (
            <div className="wrapper">
                <div className="body">
                    <input
                        type="text"
                        placeholder="제목"
                        value={post.title}
                        onChange={(e) => dispatch(changeTitle(e.target.value))}
                    />
                    <hr />
                    <textarea
                        value={post.content}
                        onChange={(e) => dispatch(changeContent(e.target.value))}
                    ></textarea>
                    <br />
                    <button onClick={publish}>수정</button>
                </div>
            </div>
    );
}

export default Edit;
