import React, { useState, useEffect } from 'react';
import Hero from './Hero';

const PopularHero = () => {
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
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
        if (response.ok) {
          const data = await response.json();
          setContent(data.results); // Save the results to state
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
    <div className='popular-sec-main'>
      <h1>Popular Movies</h1>
      <div className='popular-sec'>
        {content.length > 0 ? (
          content.map((item) => (
            <Hero
              key={item.id} // Set the key to item.id
              id={item.id}  // Pass the id as a prop
              type="movie"
              title={item.title}
              link={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default PopularHero;
