import React, { useState, useCallback } from 'react';

import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosLogOut } from 'react-icons/io';
import {
  RankingIcon,
  RegisterSellIcon,
  DashboardIcon,
} from '../../assets/images';

import { Container, MenuButton, MenuList, ItemsMenu } from './styles';

const MenuResponsive: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleVisible = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  return (
    <Container>
      <MenuButton onClick={handleVisible}>
        <GiHamburgerMenu color="#fff" size={20} />
      </MenuButton>

      {visible && (
        <MenuList>
          <ItemsMenu>
            <RegisterSellIcon />
            <span>Vendas</span>
          </ItemsMenu>
          <ItemsMenu>
            <RankingIcon />
            <span>Ranking</span>
          </ItemsMenu>
          <ItemsMenu>
            <DashboardIcon />
            <span>Dashboard</span>
          </ItemsMenu>
          <ItemsMenu>
            <IoIosLogOut color="#c32925" size={20} />
            <span>Sair</span>
          </ItemsMenu>
        </MenuList>
      )}
    </Container>
  );
};

export default MenuResponsive;
