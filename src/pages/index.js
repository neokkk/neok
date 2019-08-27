import React from 'react';

import Layout from '../components/Layout';
import Menu from '../components/Menu';
import Item from '../components/Item'

import './index.scss';

const IndexPage = () => {
    return (
        <div className='index'>
            <Layout>
                <Menu />
                <Item />
            </Layout>
        </div>
    );
}

export default IndexPage;