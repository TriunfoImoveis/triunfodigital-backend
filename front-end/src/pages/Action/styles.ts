import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: #c32925;
  padding: 0 2rem;

  @media (max-width: 768px) {
    overflow: hidden;
  }
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    margin-top: 2rem;
    color: #fff;
    font-size: 2.4rem;
    margin-bottom: 2rem;
  }

  > img {
    width: 40rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    > h1 {
      font-size: 1.6rem;
    }
    > img {
      width: 19rem;
      margin-bottom: 5rem;
    }
  }
`;
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  > button {
    width: 27rem;

    & + button {
      margin-left: 3rem;
    }
  }

  @media (max-width: 768px) {
    width: 20rem;
    button {
      font-size: 1.4rem;
    }
  }
`;
