import React, { useState, useEffect } from 'react';
import PageComp from '../components/PageComp';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Movies() {
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
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
        if (response.ok) {
          const data = await response.json();
          setContent(data.results); // Save the fetched data to state
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
    <div className='responsive-media'>
      <Navbar />
      <PageComp title="Movies" type="movie" content={content} />
      <Footer />
    </div>
  );
}
