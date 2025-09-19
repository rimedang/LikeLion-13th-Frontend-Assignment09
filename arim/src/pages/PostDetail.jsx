import { useParams, useNavigate } from 'react-router-dom';
import * as S from '../styles/PostDetail';

const STORAGE_KEY = 'myPosts';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const storedPost = localStorage.getItem(STORAGE_KEY);
  const posts = storedPost ? JSON.parse(storedPost) : [];
  const post = posts.find((p) => String(p.id) === String(id));

  const handleDelete = () => {
    // 현재 id와 다른 게시글만 필터링하여 새로운 배열 생성
    const updatedPosts = posts.filter((p) => String(p.id) !== String(id));
    // localStorage에 덮어쓰기
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
    alert('삭제되었습니다.');
    // 목록 페이지로 이동
    navigate('/');
  };

  // 게시글이 없을 경우 예외 처리
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <S.Title>{post.title}</S.Title>
      <S.Divider />
      <S.Article>{post.content}</S.Article>

      <S.ButtonWrap>
        <S.StyledLink to={`/edit/${id}`}>수정</S.StyledLink>
        <S.StyledButton onClick={handleDelete}>삭제</S.StyledButton>
      </S.ButtonWrap>
      <S.Divider />
    </>
  );
}
