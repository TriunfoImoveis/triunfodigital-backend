import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 37.5px;
  width: 100%;
  form {
    max-width: 31.2rem;
    text-align: center;
    h1 {
      margin-top: 5rem;
      margin-bottom: 3rem;
      color: #fff;
      font-size: 1.8rem;
    }
  }
`;
