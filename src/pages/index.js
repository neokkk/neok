import React from 'react';

import Layout from '../components/Layout';

import './index.scss';

const IndexPage = () => {
    return (
        <div className='index'>
            <Layout>
                <div className='index-child'>
                    <p>JavaScript 개발자 neo의 블로그입니다.</p>
                </div>
            </Layout>
        </div>
    );
}

export default IndexPage;