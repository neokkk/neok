import React from 'react';

import Header from './Header';

import './Layout.scss';

const Layout = props => {
    const [Menu, Item] = props.children;

    return (
        <div className='layout'>
            <Header />
            <div className='layout-content'>
                {Menu}
                {Item}
            </div>
        </div>
    );
}

export default Layout;