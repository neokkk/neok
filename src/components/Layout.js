import React from 'react';
import Header from './Header';
import Menu from './Menu';

import './Layout.scss';

const Layout = ({ children, overridedClassName }) => {
  return (
    <div className="layout">
      <Header />

      <div className="layout-content">
        {/* <Menu /> */}
        {children}
      </div>
    </div>
  );
}

export default Layout;
