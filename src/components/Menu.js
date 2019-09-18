import React from 'react';
import { Link } from 'gatsby';

import './Menu.scss';

const menus = ['project', 'post'];

const Menu = () => {
    let pathname = '';
    if (typeof window !== `undefined`) {
        pathname = window.location.pathname.slice(1);
    }

    return (
        <ul className='menu'>
            {menus.map(menu => 
                <Link to={menu}>
                    <li className={menu === pathname ? 'menu-li clicked' : 'menu-li'}>{menu}</li>
                </Link>    
            )}
        </ul>
    );
}

export default Menu;