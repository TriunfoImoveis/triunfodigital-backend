import styled from 'styled-components';

export const Container = styled.div`
  border: 0.1rem solid #fff;
  width: 1400px;
  height: 80px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavBarContainer = styled.nav`
  display: flex;
  border: 0.1rem solid #fff;
  height: 100%;
`;
export const NavItemContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  border: 0.1rem solid #fff;

  & + div {
    margin-left: 2.4rem;
  }
  > a {
    margin-left: 0.8rem;
    font-family: Roboto;
    font-style: normal;
    font-size: 1.6rem;
  }
`;
