import React from 'react';
import './VideoPlayerModal.css';

export default function VideoPlayerModal({ teaserKey, onClose }) {
  if (!teaserKey) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <iframe
          width="800px"
          height="400px"
          src={`https://www.youtube.com/embed/${teaserKey}`}
          title="Teaser Video"
          
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
