import React from 'react';
import { graphql } from 'gatsby';

import './Header.scss';

const Header = () => {
    return (
        <div className='header'>
            <a href='/' className='header-logo'>neok</a>
            <div>
                <div className='header-link'>
                    <a href='https://github.com/neokkk'><img src='../../../static/images/github.png' /></a>
                    <a href='mailto:seven3126@gmail.com'><img src='../../../static/images/eamil.png' /></a>
                </div>
                <span className='header-copyright'>©2019 neok All rights reserved.</span>
            </div>
        </div>
    );
}

export default Header;

export const headerQuery = graphql`
    query {
        site {
            siteMetadata {
                rights
            }
        }
    }
`;