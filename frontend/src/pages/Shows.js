import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { showsAPI } from '../services/api';

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    showsAPI.getAll()
      .then(response => setShows(response.data))
      .catch(error => console.error('Error fetching shows:', error))
      .finally(() => setLoading(false));
  }, []);

  const containerStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s'
  };

  const imageStyle = {
    width: '100%',
    height: '400px',
    objectFit: 'cover'
  };

  const contentStyle = {
    padding: '1rem'
  };

  if (loading) return <div style={{padding: '2rem'}}>Loading shows...</div>;

  return (
    <div style={containerStyle}>
      <h1>Available Shows</h1>
      <div style={gridStyle}>
        {shows.map(show => (
          <Link key={show._id} to={`/shows/${show._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <div style={cardStyle}>
              <img src={show.poster} alt={show.title} style={imageStyle} />
              <div style={contentStyle}>
                <h3>{show.title}</h3>
                <p style={{color: '#666', margin: '0.5rem 0'}}>{show.genre} • {show.duration} min</p>
                <p style={{color: '#666'}}>{show.description}</p>
                <div style={{marginTop: '1rem', fontWeight: 'bold'}}>
                  Rating: {show.rating}/10
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shows;