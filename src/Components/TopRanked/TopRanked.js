import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TopRanked.css";
import OMDB from "../../OMDB";
import Ranking from "../../Ranking";

function TopRanked(props) {
  const [movies, setMovies] = useState([]);

  const rankData = (array) => {
    let rawResults = {};

    if (array instanceof Array) {
      array.forEach((value, index) => {
        if (!rawResults[value]) {
          rawResults[value] = [index];
        } else {
          rawResults[value].push(index);
        }
      });
    }

    for (let key in rawResults) {
      if (rawResults.hasOwnProperty(key)) {
        const total = rawResults[key].length;
        rawResults[key] = total;
      }
    }

    const totalledResults = Object.entries(rawResults);

    const rankedInOrder = totalledResults.sort((a, b) => {
      return b[1] - a[1];
    });

    return rankedInOrder;
  };

  const rankMovies = async () => {
    const movieList = await Ranking.getMovieIdList();
    const idList = [];
    movieList.movies.forEach((entry) => {
      for (const key in entry) {
        idList.push(entry[key]);
      }
    });
    const rankings = rankData(idList);
    return rankings;
  };

  const getMoviePosters = async () => {
    const rankings = await rankMovies();
    const movieObjects = [];
    const getMovie = async (id) => {
      const movie = await OMDB.getFilmById(id);
      return movie;
    };

    for (let i = 0; i < 5; i++) {
      const movieObject = await getMovie(rankings[i][0]);
      movieObjects.push(movieObject);
    }
    setMovies(movieObjects);
  };

  useEffect(() => {
    getMoviePosters();
    return () => {};
  });

  return (
    <div className="top-ranked">
      <h1>Here's what people are watching</h1>
      <h2>
        These are the top 5 movies according to our users. Wanna watch one?
      </h2>
      <Link to="/movie-night">
        <p>Back to search</p>
      </Link>
      <div className="top-5-container">
        {movies.map((movie) => {
          return (
            <div key={movie.imdbID} className="movie-container-large">
              <img
                className="movie-poster-large"
                src={movie.Poster}
                alt={`poster for ${movie.Title} (${movie.Year})`}
              ></img>
              <h3>{movie.Title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopRanked;
