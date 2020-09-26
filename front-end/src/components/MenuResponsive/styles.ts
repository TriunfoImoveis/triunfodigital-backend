import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;
export const MenuButton = styled.button`
  background: none;
  border: 0;
  position: relative;
`;

export const MenuList = styled.div`
  position: absolute;
  width: 100px;
  left: calc(100% - 90px);
  top: calc(100% + 10px);
  background: #fff;
  border-radius: 0.5rem;
`;

export const ItemsMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-space-around;
  > svg {
    margin-left: 0.8rem;
    margin-right: 0.8rem;
    width: 2rem;
    path {
      fill: #c32925;
    }
  }

  span {
    color: #c32925;
  }
`;
