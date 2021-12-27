import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import './Tag.scss';

const Tag = ({ name }) => {
  const handleClick = e => {
    e.preventDefault();
  }

  return (
    <div className="tag" onClick={handleClick}>
      <FontAwesomeIcon icon={faTag} />
      <span> {name}</span>
    </div>
  );
}

export default Tag;
