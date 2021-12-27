import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import './index.scss';

const IndexPage = () => {
  return (
    <div className="index">
      <SEO />
      <Layout>
      </Layout>
    </div>
  );
}

export default IndexPage;
