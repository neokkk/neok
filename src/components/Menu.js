import React from 'react';

const menus = ['career', 'project'];

const Menu = () => {
    return (
        <ul className='menu'>
            {menus.forEach(menu => 
                <li>{menu}</li>    
            )}
        </ul>
    );
}

export default Menu;