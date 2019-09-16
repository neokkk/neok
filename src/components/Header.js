import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import './Header.scss';

const Header = () => {
    const data = useStaticQuery( // not in pages folder
        graphql`
            query {
                site {
                    siteMetadata {
                        rights
                    }
                }
            }
        `
    );

    return (
        <div className='header'>
            <span>
                <a href='/' className='header-logo'>neok</a>
            </span>
            <div>
                <div className='header-link'>
                    <a href='https://github.com/neokkk' target='_blank'><img src='images/github.png' /></a>
                    <a href='mailto:seven3126@gmail.com'><img src='images/email.png' /></a>
                </div>
                <span className='header-copyright'>{data.site.siteMetadata.rights}</span>
            </div>
        </div>
    );
}

export default Header;