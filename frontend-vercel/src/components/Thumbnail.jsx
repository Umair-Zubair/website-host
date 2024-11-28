import React from 'react';

const Thumbnail = ({ items, activeIndex, setActiveIndex }) => (
  <div className="thumbnail">
    {items.map((item, index) => (
      <div
        key={item.id}
        className={`item ${index === activeIndex ? 'active' : ''}`}
        onClick={() => setActiveIndex(index)}
      >
        <img src={item.thumbnailimageurl} alt={item.name} /> {/* Use thumbnailimageurl here */}
        <div className="content">{item.name}</div>
      </div>
    ))}
  </div>
);

export default Thumbnail;
