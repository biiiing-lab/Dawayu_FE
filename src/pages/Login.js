import styles from './Login.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username) {
            return alert("아이디를 입력하세요.");
        } else if (!password) {
            return alert("비밀번호를 입력하세요.");
        }

        fetch("/auth/login",{
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                    username : username,
                    password : password
            })  // { username, password } 로 축약 가능
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.access_token);
            dispatch(loginUser({username}));
            alert("로그인 되었습니다.");
            navigate("/Home");
        })
        .catch((err) => {
            console.error("로그인 에러: ", err);
        });
    };

    return (
        <div className={styles.login}>
            <div className={styles['login-box']}>
                <h2 className={styles.h2}>로그인</h2>
                <form className={styles.form}>
                    <input className={styles.input} type="text" placeholder="아이디" onChange={(e) => setUsername(e.target.value)} />
                    <input className={styles.input} type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
                    <button className={styles.button} onClick={handleLogin}>로그인</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
