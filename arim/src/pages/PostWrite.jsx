import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from '../styles/PostWrite';

const STORAGE_KEY = 'myPosts';

export default function PostWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const storedPosts = localStorage.getItem(STORAGE_KEY);
      const posts = storedPosts ? JSON.parse(storedPosts) : [];
      const currentPost = posts.find((p) => String(p.id) === String(id));

      if (currentPost) {
        setTitle(currentPost.title);
        setContent(currentPost.content);
      }
    }
  }, [id, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('제목을 입력해주세요!');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요!');
      return;
    }

    const storedPosts = localStorage.getItem(STORAGE_KEY);
    const posts = storedPosts ? JSON.parse(storedPosts) : [];

    if (isEditing) {
      // 수정 로직
      const updatedPosts = posts.map((post) =>
        String(post.id) === String(id)
          ? { ...post, title: title.trim(), content: content.trim() }
          : post
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
      // 수정된 글로 이동
      navigate(`/posts/${id}`);
    } else {
      //새로운 글 저장
      const newPost = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
      };
      const nextPosts = [newPost, ...posts];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPosts));

      navigate(`/posts/${newPost.id}`);
    }
  };

  return (
    <>
      <S.Title>{isEditing ? '글 수정' : '글쓰기'}</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.Label>
          <S.Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </S.Label>

        <S.Label>
          <S.LabelText>내용</S.LabelText>
          <S.Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
            rows={8}
          />
        </S.Label>

        <S.Button type="submit">{isEditing ? '수정하기' : '작성하기'}</S.Button>
      </S.Form>
    </>
  );
}
