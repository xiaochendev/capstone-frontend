import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css'
// Import components
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";


// Create state to hold our movie data.
// Create a function that is given the search term, then does the fetch request for the movie data, and then stores it in state.
// Pass the function down to Form via props.

function App() {
    const API_KEY = "98e3fb1f";
    // const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // for Vite, all env variable must start w VITE_
  
    // State to hold movie data
    const [movie, setMovie] = useState(null);
  
    // Function to get movies
    const getMovie = async(searchTerm) => {
    
    try {
      // Make fetch request and store the response
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&t=${searchTerm}`
      );
      // Parse JSON response into a JavaScript object
      const data = await response.json();
      // Set the Movie state to the received data
      setMovie(data);
      } catch (e) {
        console.error(e);
      }
    };
    
    // try to change the useEffect we created so that it grabs a random movie on each page refresh, rather than always starting with "Clueless."
    useEffect(() => {
      const randomMovies = ["Clueless", "Titantic", "Test", "Mean Girls", "The Dark Night"];
      const randomIndex = Math.floor(Math.random() * randomMovies.length);
      const randomMovie = randomMovies[randomIndex];

      // This will run on the first render but not on subsquent renders
      // getMovie("Clueless");
      
      getMovie(randomMovie);
    }, []);
  
    // We pass the getMovie function as a prop called moviesearch
    // We pass movie as props to movie display
    return (
      <div className="App">
        <Form moviesearch={getMovie} />
        <MovieDisplay movie={movie} />
      </div>
    );
};

export default App;