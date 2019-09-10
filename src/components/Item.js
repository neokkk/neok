import React from 'react';

import Tag from './Tag';

import './Item.scss';

const Item = ({ info }) => {
    return (
        <a href={info.link} target='_blank' className='item'>
            <span className='item-title'>{info.title}</span>
            <span className='item-period'>{info.period}</span>
            <div className='item-info'>{info.content}</div>
            {info.tags.map(tag => 
                <Tag name={tag} />    
            )}
        </a>
    );
}

export default Item;