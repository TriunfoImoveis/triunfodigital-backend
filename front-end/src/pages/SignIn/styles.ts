import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  padding: 0 2rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  svg {
    margin-top: 5.2rem;
    width: 30rem;
    margin-bottom: 7.4rem;
  }

  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 3.2rem;
    line-height: 3.7rem;
    color: #fff;
  }
`;
