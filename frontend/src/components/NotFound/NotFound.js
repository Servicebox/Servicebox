import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    }}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 16px' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', margin: '0 0 24px' }}>Страница не найдена</h2>
      <p style={{ fontSize: '1.1rem', marginBottom: '24px' }}>
        К сожалению, запрашиваемая вами страница не существует.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 24px',
          fontSize: '1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        Вернуться на главную
      </button>
    </div>
  );
};

export default NotFound;