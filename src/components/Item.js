import React from 'react';
import Tag from './Tag';

import './Item.scss';

const numberTransform = (num) => num < 10 ? '0' + num : num;

const Item = ({ info, index }) => {
  return (
    <a href={info.link} target="_blank" className="item">
      <span className="item-title">{numberTransform(index)}</span>
      <span className="item-period">{info.period}</span>
      <div className="item-info">{info.content}</div>
      {info.tags.map((tag) => 
        <Tag name={tag} />    
      )}
    </a>
  );
}

export default Item;
