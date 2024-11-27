import React from 'react';

const Thumbnail = ({ items, activeIndex, setActiveIndex }) => (
  <div className="thumbnail">
    {items.map((item, index) => (
      <div
        key={item.id}
        className={`item ${index === activeIndex ? 'active' : ''}`}
        onClick={() => setActiveIndex(index)}
      >
        <img src={item.thumbnailImageUrl} alt={item.name} /> {/* Direct URL from the database */}
        <div className="content">{item.name}</div>
      </div>
    ))}
  </div>
);

export default Thumbnail;
