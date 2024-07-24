import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../store';

const LogoutFunc = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 토큰 제거 및 상태 업데이트
    const handleLogout = () => {
        dispatch(clearUser());
        localStorage.removeItem("message");
        alert('로그아웃 되었습니다.');
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>로그아웃</button>
    );
};

export default LogoutFunc;
