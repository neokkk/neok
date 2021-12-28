import styled from 'styled-components';

export const Wrapper = styled.div`
  color: ${({ theme }) => theme.color.gray};
  max-width: 700px;
  width: 100%;
  height: 100%;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  pre {
    width: 100%;
    background-color: #f8f8f8 !important;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    overflow-x: auto;
    text-align: left;

    code {
      font-size: 13px;
      font-family: ${({ theme }) => theme.font.sourceCode};
      color: ${({ theme }) => theme.color.gray};
    }
  }

  ${({ theme }) => theme.tablet`
    margin: 20px auto;
  `}
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.orange};
  font-family: ${({ theme }) => theme.font.spoqaHan};
  font-size: 2.2rem;
  margin: 20px;

  ${({ theme }) => theme.tablet`
    font-size: 1.8rem;
  `}
`;

export const Date = styled.p`
  font-family: ${({ theme }) => theme.font.spoqaHan};
  font-size: 0.8rem;
  opacity: 0.7;
`;

export const Html = styled.div`
  font-family: ${({ theme }) => theme.font.spoqaHan};
  font-size: 0.95rem;
  width: 100%;
  padding: 60px 20px 20px;
  display: flex;
  flex-direction: column;

  a {
    color: ${({ theme }) => theme.color.orange};
    text-decoration: none;
    
    &:hover {
      color: white;
      background-color: ${({ theme }) => theme.color.orange};
      padding: 0 4px;
      border-radius: 4px;
    }
  }

  img {
    width: 100%;
    margin-top: 4px;
  }

  ol,
  ul {
    padding-left: 18px;
  }

  hr {
    color: ${({ theme }) => theme.color.gray}20;
  }

  ${({ theme }) => theme.tablet`
    font-size: 0.9rem;
  `}
`;
