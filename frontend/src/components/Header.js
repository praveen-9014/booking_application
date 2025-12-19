import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, logout }) => {
  const headerStyle = {
    background: '#d32f2f',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const navStyle = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background 0.3s'
  };

  return (
    <header style={headerStyle}>
      <Link to="/shows" style={{...linkStyle, fontSize: '1.5rem', fontWeight: 'bold'}}>
        BookMyShow
      </Link>
      {user && (
        <nav style={navStyle}>
          <Link to="/shows" style={linkStyle}>Shows</Link>
          <Link to="/my-bookings" style={linkStyle}>My Bookings</Link>
          <span>Hi, {user.name}</span>
          <button 
            onClick={logout}
            style={{...linkStyle, background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer'}}
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;