import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const usePostDeleteFunc = () => {
    const navigate = useNavigate();

    const deletePost = async(postNo) => {
        try {
            await axios.delete(`http://localhost:8080/posts/${postNo}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('message')}`
                },
            });
            alert('게시물이 삭제되었습니다.');
            navigate("/myPage");
        } catch (err) {
            console.error("게시물 삭제 오류: ", err);
        }
    };

    return deletePost;

  
};

export default usePostDeleteFunc;