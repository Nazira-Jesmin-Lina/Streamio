import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './heroStyle.css';

export default function Hero({type, id, title, link }) {
  return (
    <div className='hero'>
      <div className='image-sec'>
        <Link to={`/detailpage/${id}/${type}`}>  {/* Link to the detailpage with the movie id */}
          <img alt={title} src={link} />
        </Link>
      </div>
      <h1>{title}</h1>
    </div>
  );
}
