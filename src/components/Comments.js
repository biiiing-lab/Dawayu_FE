import { useParams } from "react-router-dom"
import { useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';

function Comments({ comments, postNo, setComments }){
    const [content, setContent] = useState("");
    const [isValid, setIsValid] = useState(false);  // 댓글이 공백이 아닌지 유효성 검사

    const postComment = async () => {   // 댓글 발행 함수. 여기서 response로 받은 commentId를 어떻게 활용해야 하는지 모르겠다
        try {
            const res = await axios.post(`http://localhost:8080/posts/${postNo}/comments`, { content }, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                  }
            });

            (alert("댓글이 작성되었습니다."))
            setComments([...comments, res.data]); // 새로운 댓글을 기존 목록에 추가
        } catch (err) {
            console.error("댓글 작성 오류:", err);
        }
    };
    return (
        <div>
            <input 
                type="text" 
                placeholder="댓글을 입력하세요." 
                onChange={(e) => {
                    setContent(e.target.value);
                    e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);
                }} 
            />
            <button onClick={() => {
                if (!localStorage.getItem("token")) {
                    alert("로그인이 필요합니다.");
                } else if (!isValid) {
                    alert("댓글을 한 글자 이상 입력하세요.");
                } else {
                    postComment();
                }
            }}>
                등록
            </button>
            <br />
            {
                comments.map((comment, i) => (
                    <div key={i}>
                        <p>{comment.comment}</p>
                        <p>{comment.commentUserNickname}</p>
                        <p>{new Date(comment.commentCreatedAt).toLocaleString()}</p>
                        <hr />
                    </div>
                ))
            }
        </div>
    );
}

export default Comments;
