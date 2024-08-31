import React from 'react';
import { Link } from 'react-router-dom';
import './pagecomp.css';

export default function PageComp({ title, content = [], type }) {
  if (!Array.isArray(content) || content.length === 0) {
    return <div>No content available</div>;
  }

  return (
    <div className='pagescreen'>
      <h1>{title}</h1>
      <div className='movies-container'>
        {content.map((item) => (
          <div key={item.id} className='image-text-div'>
            <Link to={`/detailpage/${item.id}/${type}`}>
              <img
                alt={item.title}
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
