import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from "../store";

const LogoutFunc = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    axios.post('/auth/logout', {
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

export default LogoutFunc;