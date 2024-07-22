import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearUser, addLikedPosts, addPosts } from "../store";
import styles from './MyPage.module.css';
import { Tab, Tabs } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyPage(){
    const user = useSelector((state) => state.user);
    const userInfo = useSelector((state) => state.userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LogoutFunc = () => {  // 로그아웃 함수
        fetch('/auth/logout', {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        })
        .then(() => {
            dispatch(clearUser());
            localStorage.removeItem("token");
            alert('로그아웃 되었습니다.');
            navigate('/login');
        })
        .catch((err) => {
            console.error('로그아웃 에러:', err);
        });
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert("로그인을 해주세요.");
            navigate('/login');
        } else {
            axios.get('/user/mypage', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then((res) => {
                dispatch(addPosts(res.data.posts));
                dispatch(addLikedPosts(res.data.likedPosts));
            })
            .catch((err) => {
                console.error('데이터 가져오기 에러:', err);
            });
        }
    }, [navigate, dispatch]);

    return (
        <>
          <h2 className={styles.h2}>My Page</h2>
          <p>{user.username}님, 안녕하세요!</p>
          <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="home" title="작성한 글">
                {userInfo.posts.map((post, index) => (
                    <div key={index}>
                        <h5>{post.title}</h5>
                        <p>{post.createdAt}</p>
                        <hr />
                    </div>
                ))}
            </Tab>
            <Tab eventKey="profile" title="좋아요 한 글">
                {userInfo.likedPosts.map((post, index) => (
                    <div key={index}>
                        <h5>{post.title}</h5>
                        <hr />
                    </div>
                ))}
            </Tab>
          </Tabs>
          <button onClick={LogoutFunc}>로그아웃</button>
        </>
    );
}

export default MyPage;
