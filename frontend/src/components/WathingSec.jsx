
import React, { useState,useEffect } from 'react'
import Hero from './Hero';

const WathingSec = () => {
    const [content, setcontent] = useState([]);


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
        const response = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options)
        if (response.ok) {
          const data = await response.json();
          console.log(data.results[0].poster_path)
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setcontent(data.results); // Save the poster path to state
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
        <h1>Airing on Today</h1>
        <div className='popular-sec'>
        
        {content.length > 0 ? (
                  content.map((item) => (
                      <Hero
                      key={item.id} // Set the key to item.id
                      id={item.id}  // Pass the id as a prop
                      title={item.name}
                      type="tv"
                      link={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                      />
                  ))
              ) : (
                  <p>Loading...</p>
              )}
  
              {/* <Hero
              
              title="Popular Movies"
              {content.map((item)=>)(
                  link={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
              )}
              /> */}
      </div>
    </div>
    
  )
}

export default WathingSec
