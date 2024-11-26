import React from 'react';
import Header from '../components/Header';
import CanCarousel from '../components/CanCarousel';
import '../canStyles.css';

const CanPage = () => {
  return (
    <div className="can-page">
      <Header />
      <CanCarousel />
    </div>
  );
};

export default CanPage;
