import React from 'react';

const MockupDisplay = ({ left }) => (
  <div
    className="mockup"
    style={{
      '--left': `${left}%`,
      backgroundImage: `
        url(images/mockup.png), 
        url(images/SURGE.png)`
    }}
  ></div>
);

export default MockupDisplay;
