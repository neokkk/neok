import React, { useState, useEffect } from 'react';

import Layout from '../components/Layout';
import Item from '../components/Item'

import './index.scss';
import { projects } from '../constant/projects';

const ProjectPage = () => {
  const [pin, setPin] = useState(false);

  useEffect(() => {
    setPin(true);
  });

  return (
    <div className="index">
      <Layout>
        {pin && projects.reverse().map((p, index) => 
          <Item info={p} index={index + 1} />
        )}
      </Layout>
    </div>
  );
}

export default ProjectPage;
