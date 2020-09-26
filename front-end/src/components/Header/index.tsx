import React from 'react';

import { IoIosLogOut } from 'react-icons/io';
import {
  LogoHeader,
  RankingIcon,
  RegisterSellIcon,
  DashboardIcon,
} from '../../assets/images';

import MenuResponsive from '../MenuResponsive';

import { Container, NavBarContainer, NavItemContent } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <LogoHeader />
      <NavBarContainer>
        <NavItemContent>
          <RankingIcon />
          <a href="#top">Ranking</a>
        </NavItemContent>
        <NavItemContent>
          <RegisterSellIcon />
          <a href="#top">Vendas</a>
        </NavItemContent>
        <NavItemContent>
          <DashboardIcon />
          <a href="#top">Dashboard</a>
        </NavItemContent>
        <NavItemContent>
          <IoIosLogOut size={40} color="#fff" />
          <a href="#top">Sair</a>
        </NavItemContent>
      </NavBarContainer>
      <MenuResponsive />
    </Container>
  );
};

export default Header;
