import React from 'react';

import './Menu.scss';

const menus = ['career', 'project'];

const Menu = () => {
    return (
        <ul className='menu'>
            {menus.map(menu => 
                <li>{menu}</li>    
            )}
        </ul>
    );
}

export default Menu;