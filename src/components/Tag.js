import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import './Tag.scss';

const Tag = ({ name }) => {
    return (
        <div className='tag'>
            <FontAwesomeIcon icon={faTag} />
            <span> {name}</span>
        </div>
    );
}

export default Tag;