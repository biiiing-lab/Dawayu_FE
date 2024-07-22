import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './AppNavbar.module.css';

function AppNavbar(){
    let navigate = useNavigate(); // 페이지 이동. 특정 이벤트나 로직 적용하고 싶을 때 주로 사용
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
          <Navbar.Brand className={styles.title} onClick={() => { navigate('/') }}>다와유</Navbar.Brand>
          <Nav className="menu">
            <Nav.Link onClick={() => { navigate('/login') }}>로그인</Nav.Link>
            <Nav.Link onClick={() => { navigate('/signUp') }}>회원가입</Nav.Link>
            <Nav.Link onClick={() => { navigate('/myPage') }}>마이페이지</Nav.Link>
            <button onClick={() => { navigate('/write') }}>글쓰기</button>
          </Nav>
        </Container>
      </Navbar>
    )
}

export default AppNavbar;