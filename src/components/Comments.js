import { useParams } from "react-router-dom"
import { useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';

function Comments(comments){
    const user = useSelector((state) => state.user)
    const { postId } = useParams();
    const [comment, setComment] = useState({username: "", comment: ""});
    const [isValid, setIsValid] = useState(false);  // 댓글이 공백이 아닌지 유효성 검사

    const postComment = async () => {   // 댓글 발행 함수. 여기서 response로 받은 commentId를 어떻게 활용해야 하는지 모르겠다
        try {
            await axios.post(`/posts/${postId}/comments`, { comment, username: user.username }, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                  }
            })
            .then(alert("댓글이 작성되었습니다."))
        } catch (err) {
            console.error("댓글 작성 오류:", err);
        }
    };

    return (
        <div>
            <input type="text" placeholder="댓글을 입력하세요." onChange={(e) => {
                setComment.username(user.username);
                setComment.comment(e.target.value);
            }}
            onKeyUp={(e) => {
                e.target.value.length > 0
                ? setIsValid(true)
                : setIsValid(false);
            }} />
            <button onClick={() => {
                if (!localStorage.getItem("token")){
                    alert("로그인이 필요합니다.");
                } else if (!isValid) {
                    alert("댓글을 한 글자 이상 입력하세요.");
                } else {
                    postComment();
                }}}>등록</button>
            <br />
            {
                comments.map((comment, i) => {   // 서버에서 가져온 comments 목록 출력
                    return (
                        <div key={i}>
                          <h6>{comment.username}</h6>
                          <p>{comment.comment}</p>
                          <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Comments;
