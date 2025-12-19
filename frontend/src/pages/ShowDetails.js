import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { showsAPI } from '../services/api';

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    showsAPI.getById(id)
      .then(response => setShow(response.data))
      .catch(error => console.error('Error fetching show:', error))
      .finally(() => setLoading(false));
  }, [id]);

  const containerStyle = {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto'
  };

  const detailsStyle = {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const showtimesStyle = {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const showtimeCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const buttonStyle = {
    background: '#d32f2f',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block'
  };

  if (loading) return <div style={{padding: '2rem'}}>Loading...</div>;
  if (!show) return <div style={{padding: '2rem'}}>Show not found</div>;

  return (
    <div style={containerStyle}>
      <div style={detailsStyle}>
        <img src={show.poster} alt={show.title} style={{width: '100%', borderRadius: '8px'}} />
        <div>
          <h1>{show.title}</h1>
          <p style={{fontSize: '1.1rem', margin: '1rem 0'}}>{show.description}</p>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0'}}>
            <div><strong>Genre:</strong> {show.genre}</div>
            <div><strong>Duration:</strong> {show.duration} minutes</div>
            <div><strong>Rating:</strong> {show.rating}/10</div>
          </div>
        </div>
      </div>

      <div style={showtimesStyle}>
        <h2>Showtimes</h2>
        {show.showtimes.map(showtime => (
          <div key={showtime._id} style={showtimeCardStyle}>
            <div>
              <div><strong>{new Date(showtime.date).toDateString()}</strong></div>
              <div>{showtime.time} • {showtime.theater}</div>
              <div>Available: {showtime.availableSeats}/{showtime.totalSeats}</div>
            </div>
            <div style={{textAlign: 'right'}}>
              <div style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
                ₹{showtime.price}
              </div>
              {showtime.availableSeats > 0 ? (
                <Link 
                  to={`/booking/${show._id}/${showtime._id}`}
                  style={buttonStyle}
                >
                  Book Now
                </Link>
              ) : (
                <span style={{color: 'red'}}>Sold Out</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowDetails;