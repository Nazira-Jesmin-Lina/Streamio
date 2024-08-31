import React, { useState, useEffect } from 'react';
import './homecomp.css';
import VideoPlayerModal from '../components/VideoPlayerModal'; // Import the modal component
import { useNavigate } from 'react-router-dom';

const Homepagecomp = () => {
  const [content, setContent] = useState(null);
  const [movieId, setMovieId] = useState(null); // To store the movie ID
  const [teaserKey, setTeaserKey] = useState(null); // To store the teaser key
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage modal visibility

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTliMjRjZWU3YzI5NmIwMzFmNzBiNTc1ZGE1ODBjNyIsIm5iZiI6MTcyNDY3NzI5MS44MzUwMDQsInN1YiI6IjY2Y2M3ODA3OWQ2MjhjZDJlYTMyOWUwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITtBRF2mUWsLl34uH3MImoDnmFbqkM69BlMKMyTfXCg'
        }
      };

      try {
        const response = await fetch('http://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
        if (response.ok) {
          const data = await response.json();
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setContent(data.results[randomIndex]); // Save the poster path to state
          setMovieId(data.results[randomIndex].id); // Save the movie ID to state
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (e) {
        console.error('Fetch error:', e);
      }
    };

    fetchData();
  }, []);


  const navigate = useNavigate(); // Initialize navigate

  const handleMoreInfoClick = () => {
    
    if (!movieId) return;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTliMjRjZWU3YzI5NmIwMzFmNzBiNTc1ZGE1ODBjNyIsIm5iZiI6MTcyNDY3NzI5MS44MzUwMDQsInN1YiI6IjY2Y2M3ODA3OWQ2MjhjZDJlYTMyOWUwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITtBRF2mUWsLl34uH3MImoDnmFbqkM69BlMKMyTfXCg'
      }
    };
    navigate(`/detailpage/${movieId}/movie`); 
  }

  const handlePlayClick = () => {
    if (!movieId) return;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTliMjRjZWU3YzI5NmIwMzFmNzBiNTc1ZGE1ODBjNyIsIm5iZiI6MTcyNDY3NzI5MS44MzUwMDQsInN1YiI6IjY2Y2M3ODA3OWQ2MjhjZDJlYTMyOWUwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITtBRF2mUWsLl34uH3MImoDnmFbqkM69BlMKMyTfXCg'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        const teaser = response.results.find(video => 
          video.type.trim().toLowerCase() === 'teaser' || 
          video.type.trim().toLowerCase() === 'trailer' || 
          video.type.trim().toLowerCase() === 'clip' || 
          video.type.trim().toLowerCase() === 'featurette'
        );
        if (teaser) {
          setTeaserKey(teaser.key);
          setIsModalOpen(true); // Open the modal
        } else {
          console.error('No teaser found');
        }
      })
      .catch(err => console.error(err));
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
    setTeaserKey(null); // Clear the teaser key
  };

  return (
    <div className='home'>
      {content && (
        <img
          alt='Movie Poster'
          src={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`}
        />
      )}
      <div className='home-des'>
        <h1>{content?.title}</h1>
        <p>{content?.overview}</p>
        <div className='buttons-div'>
          
          <button className='playbtn' onClick={handlePlayClick}>
            <span><i className="fa-solid fa-play" /></span>
            <span>Play</span>
          </button>

          <button className='morebtn' onClick={handleMoreInfoClick}>
            <span><i className="fa-solid fa-circle-info"></i></span>
            <span>More info</span>
          </button>

          <div className='vol'>
            <i className="fa-solid fa-volume-high"></i>
          </div>
        </div>
      </div>

      {/* Render the VideoPlayerModal */}
      {isModalOpen && (
        <VideoPlayerModal teaserKey={teaserKey} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default Homepagecomp;
