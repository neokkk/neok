import React from 'react';
import Header from './Header';
import Menu from './Menu';

import '../../pages/index.scss';
import './Layout.scss';

const Layout = ({ children }) => {
    return (
        <div className='layout'>
            <Header />
            <div className='layout-content'>
                <Menu />
                {children}
            </div>
        </div>
    );
}

export default Layout;