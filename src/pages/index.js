import React from 'react';

import Layout from '../components/Layout';
import Menu from '../components/Menu';
import Item from '../components/Item'

const IndexPage = () => {
    return (
        <Layout>
            <Menu />
            <Item />
        </Layout>
    );
}

export default IndexPage;