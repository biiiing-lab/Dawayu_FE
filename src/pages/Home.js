import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const { postId } = useParams();
    const [postsList, setPostsList] = useState([]);

    const getPostsList = async () => {
        try {
            let res = await axios.get('/posts');
            setPostsList(res.data);
        } catch (err) {
            console.error('게시물 가져오기 오류:', err);
        }
    };

    useEffect(() => {
        getPostsList();
    }, []);

    return (
        <>
            {postsList.map((post, i) => ( // 각 게시물에 대해 링크를 생성
                <div key={i}>
                    <Link to={`/posts/${postId}`}>{post.title}</Link> {/* 게시물의 postId를 반영 */}
                    <p>{post.createdAt}</p>
                    <p>{post.username}</p>
                    <hr />
                </div>
            ))}
        </>
    );
}

export default Home;
