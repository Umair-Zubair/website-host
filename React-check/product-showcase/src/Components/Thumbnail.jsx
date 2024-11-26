import React from 'react';

const Thumbnail = ({ items, activeIndex, setActiveIndex }) => (
  <div className="thumbnail">
    {items.map((item, index) => (
      <div
        key={item.id}
        className={`item ${index === activeIndex ? 'active' : ''}`}
        onClick={() => setActiveIndex(index)}
      >
        <img src={item.thumbnailImageUrl || 'images/default-thumbnail.jpg'} alt={item.name} />
        <div className="content">{item.name}</div>
      </div>
    ))}
  </div>
);

export default Thumbnail;
