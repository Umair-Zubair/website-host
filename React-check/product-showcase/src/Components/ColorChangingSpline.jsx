import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function ColorChangingSpline() {
  const [app, setApp] = useState(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Define the color states in an array
  const colors = [
    { color1: 100, color2: 0, color3: 0 },    // Red
    { color1: 0, color2: 100, color3: 0 },    // Green
    { color1: 0, color2: 0, color3: 100 }     // Blue
  ];

  // Function to apply color based on the current index
  const applyColor = (index) => {
    if (!app?.setVariables) return;
    
    const color = colors[index];
    app.setVariables(color);
  };

  // Function to handle manual color changes
  const changeColor = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentColorIndex + 1) % colors.length;
    } else {
      newIndex = (currentColorIndex - 1 + colors.length) % colors.length;
    }
    setCurrentColorIndex(newIndex);
    applyColor(newIndex);
  };

  useEffect(() => {
    if (!app) return;

    // Apply the first color immediately on load
    applyColor(currentColorIndex);

    // Set up auto-changing interval that continues regardless of manual changes
    const colorInterval = setInterval(() => {
      setCurrentColorIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % colors.length;
        applyColor(newIndex);
        return newIndex;
      });
    }, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(colorInterval);
  }, [app]);

  return (
    <div className="spline-container">
      <button 
        id="prev" 
        onClick={() => changeColor('prev')}
        aria-label="Previous color"
      >
        &#8249;
      </button>
      
      <Spline
        scene="https://prod.spline.design/i04iXPXzyN8Qo939/scene.splinecode"
        onLoad={(splineApp) => setApp(splineApp)}
      />
      
      <button 
        id="next" 
        onClick={() => changeColor('next')}
        aria-label="Next color"
      >
        &#8250;
      </button>
    </div>
  );
}