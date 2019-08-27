import React from 'react';

import Tag from './Tag';

const Item = () => {
    return (
        <div className='item'>
            <h1 className='item-name'>Project01</h1>
            <p className='item-period'>2019.05 ~ 2019.07</p>
            <div className='item-info'></div>
            <Tag />
        </div>
    );
}

export default Item;