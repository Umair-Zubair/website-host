import React, { useState, useEffect } from 'react';
import MockupDisplay from './MockupDisplay';

const CanCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const [mockupLeft, setMockupLeft] = useState(0);
  const items = [
    { background: '#EA3D41', content: 'Strawberry', imgSrc: 'images/fruit_strawberry.png' },
    { background: '#2D5643', content: 'Avocado', imgSrc: 'images/fruit_avocado.png' },
    { background: '#E7A043', content: 'Orange', imgSrc: 'images/fruit_orange.png' },
  ];

  const handleNext = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev + 1) % items.length);
    setMockupLeft((prev) => prev + 100 / (items.length - 1));
  };

  const handlePrev = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    setMockupLeft((prev) => prev - 100 / (items.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`carousel ${direction}`}>
      <div className="list">
        {items.map((item, index) => (
          <div
            key={index}
            className={`item ${index === activeIndex ? 'active' : index === (activeIndex - 1 + items.length) % items.length ? 'hidden' : ''}`}
            style={{ '--background': item.background }}
          >
            <div className="content">{item.content}</div>
            <img src={item.imgSrc} className="fruit" alt={item.content} />
          </div>
        ))}
      </div>
      <div className="leaves"><img src="images/leaves.png" alt="Leaves"/></div>
      <MockupDisplay left={mockupLeft} />
      <div className="shadow"></div>
      <div className="arrow">
        <button id="prev" onClick={handlePrev}>&lt;</button>
        <button id="next" onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default CanCarousel;
