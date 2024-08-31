import './topten.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

export default function Topten(props) {
  const [content, setContent] = useState([]);

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
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
        if (response.ok) {
          const data = await response.json();
          setContent(data.results.slice(0, 10)); // Get the top 10 items
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (e) {
        console.error('Fetch error:', e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='ten'>
  <h1 className='heading'>{props.title}</h1>
  <div className='container-sec'>
    {content.map((item, index) => (
      <div key={index} className='topten-sec'>
        <h1>{index + 1}</h1>
        <div className='img-text-container'>
        <Link to={`/detailpage/${item.id}/movie`}>  {/* Link to the detailpage with the movie id */}
          <img alt='Top TV Show' src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} />
        </Link>
          <h2>{item?.name || item?.title}</h2>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
