import React from 'react';

import { LogoHeader, RankingIcon, RegisterSellIcon } from '../../assets/images';

import { Container, NavBarContainer, NavItemContent } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <LogoHeader />
      <NavBarContainer>
        <NavItemContent>
          <RankingIcon />
          <a href="#top">Ranking Geral</a>
        </NavItemContent>
        <NavItemContent>
          <RegisterSellIcon />
          <a href="#top">Casdastrar Vendas</a>
        </NavItemContent>
        <NavItemContent>
          <RankingIcon />
          <a href="#top">Visualizar Dashboard</a>
        </NavItemContent>
        <NavItemContent>
          <RankingIcon />
          <a href="#top">Sair</a>
        </NavItemContent>
      </NavBarContainer>
    </Container>
  );
};

export default Header;
