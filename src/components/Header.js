import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

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
    <div className="header">
      <Link to="/" className="header-logo">neok</Link>

      <div>
        <div className="header-link">
          <a href="https://github.com/neokkk" target="_blank" rel="noopener">
            <img src="/images/github.png" alt="github" />
          </a>
          <a href="mailto:seven3126@gmail.com">
            <img src="/images/email.png" alt="email" />
          </a>
          <a href="https://www.linkedin.com/in/nakyeong-kim-b8ab8b179/" target="_blank" rel="noopener">
            <img src="/images/linkedin.png" alt="linkedin" />
          </a>
        </div>
        <span className="header-copyright">{data.site.siteMetadata.rights}</span>
      </div>
    </div>
  );
}

export default Header;
