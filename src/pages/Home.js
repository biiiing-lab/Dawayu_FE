import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostDetail from './PostDetail';

function Home() {
    const [postsList, setPostsList] = useState([]);

    const getPostsList = async () => {
        try {
            let res = await axios.get('http://localhost:8080/posts');
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
                    <Link to={`/posts/${post.postNo}`}><h5>{post.title}</h5></Link> {/* 게시물의 postId를 반영 */}
                    <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                    <h6>{post.username}</h6>
                    <p>좋아요 {post.likeCount}</p>
                    <hr />
                </div>
            ))}
        </>
    );
}

export default Home;
