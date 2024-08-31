import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VideoPlayerModal from '../components/VideoPlayerModal';
import './detailpage.css';
import Footer from '../components/Footer';

export default function Detailpage() {
  const { id, type ,section } = useParams();
  const [details, setDetails] = useState(null);
  const [teaserKey, setTeaserKey] = useState(null);
  const [recommendationTeaserKey, setRecommendationTeaserKey] = useState(null);
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchTeaser = (id, type, section) => {
    const baseUrl = 'https://api.themoviedb.org/3/';
    const endpoint = type === 'movie' ? `movie/${id}` : `tv/${id}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTliMjRjZWU3YzI5NmIwMzFmNzBiNTc1ZGE1ODBjNyIsIm5iZiI6MTcyNDY3NzI5MS44MzUwMDQsInN1YiI6IjY2Y2M3ODA3OWQ2MjhjZDJlYTMyOWUwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITtBRF2mUWsLl34uH3MImoDnmFbqkM69BlMKMyTfXCg'
      }
    };

    fetch(`${baseUrl}${endpoint}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(data => {
        const allVideos = data.results;
        const teaser = allVideos.find(video => 
          video.type.trim().toLowerCase() === 'teaser' || 
          video.type.trim().toLowerCase() === 'trailer' || 
          video.type.trim().toLowerCase() === 'clip' || 
          video.type.trim().toLowerCase() === 'featurette'
        );

        if (teaser) {
          if (section === "play") {
            setTeaserKey(teaser.key);
          } else if (section === "recom") {
            setRecommendationTeaserKey(teaser.key);
          }
        } else {
          console.error('No suitable video found');
        }
      })
      .catch(err => console.error('Error fetching teaser:', err));
  };

  useEffect(() => {
    const baseUrl = 'https://api.themoviedb.org/3/';
    const endpoint = type === 'movie' ? `movie/${id}` : `tv/${id}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTliMjRjZWU3YzI5NmIwMzFmNzBiNTc1ZGE1ODBjNyIsIm5iZiI6MTcyNDY3NzI5MS44MzUwMDQsInN1YiI6IjY2Y2M3ODA3OWQ2MjhjZDJlYTMyOWUwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITtBRF2mUWsLl34uH3MImoDnmFbqkM69BlMKMyTfXCg'
      }
    };

    fetch(`${baseUrl}${endpoint}?language=en-US`, options)
      .then(response => response.json())
      .then(data => setDetails(data))
      .catch(err => console.error(err));

    fetchTeaser(id, type, "play");

    fetch(`${baseUrl}${endpoint}/images`, options)
      .then(response => response.json())
      .then(data => setImages(data.backdrops || []))
      .catch(err => console.error(err));

    fetch(`${baseUrl}${endpoint}/credits?language=en-US`, options)
      .then(response => response.json())
      .then(data => setCast(data.cast || []))
      .catch(err => console.error(err));

    fetch(`${baseUrl}${endpoint}/reviews?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(data => setReviews(data.results || []))
      .catch(err => console.error(err));

    fetch(`${baseUrl}${endpoint}/recommendations?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(data => setRecommendations(data.results || []))
      .catch(err => console.error(err));
  }, [id, type]);

  const handleRecommendationClick = (recId, recType) => {
    fetchTeaser(recId, recType, "recom");
    setIsRecommendationModalOpen(true);
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className='responsive-media'>
      <Navbar />
      <div className='detailpage-design'>
        <div className='poster-intro'>
          <img
            alt='img-post'
            src={`https://image.tmdb.org/t/p/w500${details.poster_path || ''}`}
          />
          <div className='details-des'>
            <h1>{details.title || details.name || 'Title not available'}</h1>
            <h2>{details.genres?.map(genre => genre.name).join(', ') || 'Genres not available'}</h2>
            {teaserKey &&(
              <button className='play_trail' onClick={() => setIsModalOpen(true)}>
              <span><i className="fa-solid fa-play" /></span>
              <span>Play Trailer</span>
            </button>
            )}
            
            <p>{details.overview || 'Overview not available'}</p>
            <div className='credit'>
              <h1>Created By</h1>
              <h2>{details.created_by?.map(creator => creator.name).join(', ') || 'N/A'}</h2>
            </div>
          </div>
        </div>
      </div>
      
      {isModalOpen && teaserKey && (
        <VideoPlayerModal teaserKey={teaserKey} onClose={() => setIsModalOpen(false)} />
      )}

      {isRecommendationModalOpen && recommendationTeaserKey && (
        <VideoPlayerModal teaserKey={recommendationTeaserKey} onClose={() => {
          setIsRecommendationModalOpen(false);
          setRecommendationTeaserKey(null); 
        }}/>
      )}

      <div className='image-cast'>
        <div className='post-image'>
          <h1>All Images</h1>
          <div className='image-over-sec'>
            {images.map((image, index) => (
              <img
                key={index}
                alt={`img-${index}`}
                src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                className={index === currentImageIndex ? 'active' : ''}
              />
            ))}
          </div>
        </div>

        <div className='cast'>
          <h1>Cast</h1>
          <div className='cast-over-sec'>
            {cast.map((actor, index) => (
            <div key={index}>
                <img
                alt={actor.name}
                src={actor.profile_path 
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                />
                <h2>{actor.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className='review-sec'>
          <h1 className='title-rev'>Reviews</h1>
          <div className='review-details'>
            {reviews.map((review, index) => (
              <div className='review-card' key={index}>
                <div className='review-profile'>
                  <img
                    alt='profile'
                    src={`https://www.gravatar.com/avatar/${review.author_details.avatar_path || '000'}?d=identicon`}
                  />
                  <div className='profile-info'>
                    <h1 className='pro-name'>{review.author}</h1>
                    <h4 className='date'>{new Date(review.created_at).toLocaleDateString()}</h4>
                  </div>
                </div>
                <div className='review-des'>
                  <p>{review.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {recommendations.length>0 &&(
        <div className='recommendation'>
        <h1>Recommendations</h1>
        <div className='recomm-content'>
          {recommendations.map((recommendation, index) => (
            <img
              key={index}
              alt='recommendation'
              src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
              onClick={() => handleRecommendationClick(recommendation.id, recommendation.media_type)}
            />
          ))}
        </div>
      </div>
      )}
      

      <Footer />
    </div>
  );
}
