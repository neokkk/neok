import React, { useState, useEffect } from 'react';

import Layout from '../components/Layout';

import './index.scss';

const IndexPage = () => {
    const ment = '자바스크립트 개발자 neo의 블로그입니다.   ';
    const [moving, setMoving] = useState('');

    let i = 0;

    useEffect(() => {
        setInterval(() => {
            if (i > ment.length) {
                i = i % ment.length;
            }

            setMoving(ment.slice(0, i));
            i++;
        }, 150);
    }, []);
    
    return (
        <div className='index'>
            <Layout>
                <div className='index-child'>
                    <p>{moving}</p>
                </div>
            </Layout>
        </div>
    );
}

export default IndexPage;