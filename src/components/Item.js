import React from 'react';

import Tag from './Tag';

import './Item.scss';

const Item = () => {
    return (
        <div className='item'>
            <h1 className='item-name'>Project01</h1>
            <p className='item-period'>2019.05 ~ 2019.07</p>
            <div className='item-info'>회원 기반 SNS 웹 어플리케이션입니다.</div>
            <Tag />
            <Tag />
        </div>
    );
}

export default Item;