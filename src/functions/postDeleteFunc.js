import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const postDeleteFunc = async () => {
    const navigate = useNavigate();
    const { postId } = useParams();

    try {
        await axios.delete(`/posts/${postId}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            },
        });
        alert('게시물이 삭제되었습니다.');
        navigate("/myPage");
    } catch (err) {
        console.error("게시물 삭제 오류: ", err);
    }
};

export default postDeleteFunc;