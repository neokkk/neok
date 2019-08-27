import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

const Tag = () => {
    return (
        <div className='tag'>
            <FontAwesomeIcon icon={faTag} />
            <span> JavaScript</span>
        </div>
    );
}

export default Tag;