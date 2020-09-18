import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.4rem;

    color: #ffffff;
    padding-left: 0.8rem;
    margin-bottom: 0.8rem;
  }
  input {
    width: 100%;
    border: 0.2rem solid #ffffff;
    border-radius: 0.5rem;
    background: none;
    padding: 1.6rem;
    margin-bottom: 1.6rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    color: #ffffff;

    ::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;
