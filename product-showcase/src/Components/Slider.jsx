import React, { useState, useEffect } from 'react';
import Thumbnail from './Thumbnail';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState([]);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [items]);

  if (items.length === 0) return <div>Loading...</div>;

  return (
    <div className="slider">
      <div className="list">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`item ${index === activeIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${item.sliderImageUrl || 'images/default.jpg'})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <div className="content">
              <p>POWER THROUGH!</p>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button onClick={prevSlide}>&lt;</button>
        <button onClick={nextSlide}>&gt;</button>
      </div>
      <Thumbnail items={items} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </div>
  );
};

export default Slider;
