import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './AppNavbar.module.css';
import LogoutFunc from '../functions/LogoutFunc';

function AppNavbar(){
    let navigate = useNavigate(); // 페이지 이동. 특정 이벤트나 로직 적용하고 싶을 때 주로 사용
    const token = localStorage.getItem('message');

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
          <Navbar.Brand className={styles.title} onClick={() => { navigate('/home') }}>다와유</Navbar.Brand>
          <Nav className="menu">
            { !token ? (
              <>
              <Nav.Link onClick={() => { navigate('/login') }}>로그인</Nav.Link>
              <Nav.Link onClick={() => { navigate('/signUp') }}>회원가입</Nav.Link>
              </>
            ) : null }
            { token ? (
                <>
                <Nav.Link onClick={() => { navigate('/myPage') }}>마이페이지</Nav.Link>
                <Nav.Link onClick={() => { navigate('/write') }}>글쓰기</Nav.Link>
                <LogoutFunc />
                </>
            ) : null }
          </Nav>
        </Container>
      </Navbar>
    )
}

export default AppNavbar;