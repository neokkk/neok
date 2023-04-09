import Style from './Header.style';
import React from 'react';

const Header: React.FC = () => {
  return (
    <Style.Container>
      <Style.Logo to="/">neok</Style.Logo>
    </Style.Container>
  );
};

export default Header;
