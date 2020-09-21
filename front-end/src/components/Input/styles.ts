import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: none;
  border-radius: 0.5rem;
  border: 0.2rem solid #f5f5f5;
  color: #f5f5f5;
  padding: 1.6rem;
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  & + div {
    margin-top: 0.8rem;
  }

  /* display: flex;
  align-items: center;
  text-align: left;
  border: 0.2rem solid #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 0.8rem; */

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}
  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #f4ede8;
    &::placeholder {
      color: #f4ede8;
    }
  }
  svg {
    margin-right: 1.6rem;
  }
`;
