import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import styles from './SignUp.module.css';
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [newUser, setNewUser] = useState({
        userId: "",
        password: "",
        nickName: "",
        email: ""
    });
    const navigate = useNavigate();

    const createUser = (e) => {
        e.preventDefault();  // 기본 폼 제출 이벤트 방지
        const { userId, password, nickName, email } = newUser;

        if (!userId || !password || !nickName || !email) {
            alert("입력 양식을 채워주세요.");
        } else {
            axios.post('http://localhost:8080/auth/signup', newUser)
                .then(() => {
                    alert("회원가입이 완료되었습니다.");
                    navigate('/login');
                })
                .catch(err => {
                    console.error("회원가입 오류: ", err);
                });
        }
    };

    return (
        <>
            <h2 className={styles.h2}>회원가입</h2>
            <Form className={styles['signUp-form']} onSubmit={createUser}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label className={styles.title}>아이디</Form.Label>
                    <Form.Control 
                        placeholder="아이디를 입력하세요"
                        value={newUser.userId}
                        onChange={(e) => setNewUser({ ...newUser, userId: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={styles.title}>비밀번호</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNickname">
                    <Form.Label className={styles.title}>닉네임</Form.Label>
                    <Form.Control 
                        placeholder="닉네임을 입력하세요"
                        value={newUser.nickName}
                        onChange={(e) => setNewUser({ ...newUser, nickName: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={styles.title}>이메일 주소</Form.Label>
                    <Form.Control 
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">제출</Button>
            </Form>
        </>
    );
}

export default SignUp;
