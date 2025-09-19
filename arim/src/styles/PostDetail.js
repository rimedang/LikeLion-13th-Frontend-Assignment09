// PostDetail.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Title = styled.h2`
  margin: 0 0 12px;
`;

export const Divider = styled.hr`
  width: 100%;
`;

export const Article = styled.p`
  white-space: pre-wrap;
  line-height: 1.6;
`;
export const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
`;

export const StyledButton = styled.button`
  text-decoration: none;
  color: #b57f7f;
  border: 1px solid #ccc;
  padding: 6px 10px;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #b57f7f;
  border: 1px solid #ccc;
  padding: 6px 10px;
  border-radius: 10px;
  background: #fff;
  &:hover {
    background: #eee;
  }
`;
