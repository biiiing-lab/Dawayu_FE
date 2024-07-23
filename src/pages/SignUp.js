import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import styles from './SignUp.module.css';
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        nickname: "",
        email: ""
    });
    const navigate = useNavigate();

    const createUser = (e) => {
        e.preventDefault();  // 기본 폼 제출 이벤트 방지
        const { username, password, nickname, email } = newUser;

        if (!username || !password || !nickname || !email) {
            alert("입력 양식을 채워주세요.");
        } else {
             /* package.json에 proxy 설정해보고 setUpTests 파일에서 proxy 설정 따로 해봤는데 404 오류 뜨는 관계로 해당 코드 삽입
             여전히 403 오류가 뜨긴 하지만 콘솔에서 localhost:8080 주소는 올바르게 뜨는 듯?
             그렇다면 이 코드를 axios에 전체적으로 적용해야 하는 건지도 의문 */
             axios.defaults.baseURL = "http://localhost:8080"
             axios.post('/auth/signup', newUser)
                 .then(() => {
                     alert("회원가입이 완료되었습니다.");
                     navigate('/mypage');
                 })
                 .catch(err => {
                     console.error("회원가입 오류: ", err);
                 });
    };
}

    return (
        <>
            <h2 className={styles.h2}>회원가입</h2>
            <Form className={styles['signUp-form']} onSubmit={createUser}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label className={styles.title}>아이디</Form.Label>
                    <Form.Control 
                        placeholder="아이디를 입력하세요"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
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
                        value={newUser.nickname}
                        onChange={(e) => setNewUser({ ...newUser, nickname: e.target.value })}
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
