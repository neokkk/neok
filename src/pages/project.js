import React from 'react';

import Layout from '../components/Layout';
import Item from '../components/Item'

import './index.scss';
import { projects } from '../constant/projects';

const ProjectPage = () => {
    return (
        <div className='index'>
            <Layout>
                {projects.map(p => 
                    <Item info={p} />
                )}
            </Layout>
        </div>
    );
}

export default ProjectPage;