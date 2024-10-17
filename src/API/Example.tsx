import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_BASE_URL } from './apiConfig';

export default function Example() {
  const [gameData, setGameData] = useState<any>(null);

  useEffect(() => {
    axios.get(`${SERVER_BASE_URL}/example`)
      .then(response => {
        setGameData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the game data!', error);
      });
  }, []);

  return (
    <div>
      <h1>Game Information</h1>
      {gameData ? (
        <p>Title: {gameData.title}</p>
      ) : (
        <p>Loading game data...</p>
      )}
    </div>
  );
}
