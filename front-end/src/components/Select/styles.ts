import styled from 'styled-components';

export const DropDownContainer = styled.div`
  cursor: pointer;
`;
export const DropDownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  font-weight: 500;
  font-size: 1.3rem;
  color: #fff;
  background: none;
  border: 0.2rem solid #fff;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  > svg {
    margin-left: 11rem;
  }
`;
export const DropDownListContainer = styled.div``;
export const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  border: 2px solid #e5e5e5;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 500;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
export const ListItem = styled.li`
  list-style: none;
  padding: 0.8rem;
  border-top: 0.1rem solid #fff;
  border-bottom: 0.1rem solid #fff;

  &:hover {
    background: #fff;
    color: #c32925;
  }
`;
