import React from 'react';

const MockupDisplay = ({ left }) => (
  <div
    className="mockup"
    style={{
      '--left': `${left}%`,
      backgroundImage: `
        url(https://res.cloudinary.com/dfuedbntn/image/upload/v1732781646/mockup_yeywcb.png),
        url(https://res.cloudinary.com/dfuedbntn/image/upload/v1732781646/SURGE_jfqvut.png)`,
    }}
  ></div>
);

export default MockupDisplay;
