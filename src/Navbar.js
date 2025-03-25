// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#333', padding: '10px 20px', position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
        <li style={{ margin: '0 20px' }}>
          <Link style={{ color: 'white', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold', transition: 'color 0.3s ease' }} to="/app">
            首頁
          </Link>
        </li>
        <li style={{ margin: '0 20px' }}>
          <Link style={{ color: 'white', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold', transition: 'color 0.3s ease' }} to="/register">
            註冊
          </Link>
        </li>
        <li style={{ margin: '0 20px' }}>
          <Link style={{ color: 'white', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold', transition: 'color 0.3s ease' }} to="/login">
            登入
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
