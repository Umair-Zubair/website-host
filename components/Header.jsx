import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <div className="logo">Surge</div>
    <ul className="menu">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/bottle">Bottle</Link></li>
      <li><Link to="/can">Can</Link></li>
    </ul>
    <div className="logo">Surge</div>
   
  </header>
);

export default Header;
