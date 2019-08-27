import React from 'react';
import { graphql } from 'gatsby';

const Header = () => {
    return (
        <div className='header'>
            <a href='/' className='header-logo'>neok</a>
            <div className='header-link'>
                <img src='../../../static/images/github.png' />
                <img src='../../../static/images/eamil.png' />
            </div>
            <span className='layout-copyright'>©2019 neok All rights reserved.</span>
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