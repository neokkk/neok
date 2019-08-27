import React from 'react';

import Header from './Header';

const Layout = props => {
    const [Menu, Item] = props.children;

    return (
        <div className='layout'>
            <Header />
            <div className='layout-right'>
                {Menu}
                {Item}
            </div>
        </div>
    );
}

export default Layout;