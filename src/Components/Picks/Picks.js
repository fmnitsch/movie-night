import { useEffect } from "react";
import "./Picks.css";

function Nominations(props) {
  const unNominationAnimation = (id) => {
    const nominationMovieCard = document.getElementById(`nominated ${id}`);

    nominationMovieCard.classList.add("onClick");
    setTimeout(() => {
      nominationMovieCard.classList.remove("onClick");
    }, 300);
  };

  const unNominateMovie = (e) => {
    unNominationAnimation(e.target.id);
    setTimeout(() => {
      props.unNominateMovie(e.target.id);
    }, 90);
  };

  useEffect(() => {
    const instructions = document.querySelector(".nominations-instructions");
    props.nominations.length > 0
      ? (instructions.style.display = "none")
      : (instructions.style.display = "block");
  });

  return (
    <div className="nominations-container">
      <h2 className="nominations-header">
        Your Picks ({props.nominations.length}/5)
      </h2>
      <div className="movie-list-container">
        <p className="nominations-instructions">
          Your picks will appear here as you select them from the search
          results.
        </p>

        {props.nominations.map((movie) => {
          return (
            <div
              className={`movie-card nominated ${movie.imdbID}`}
              id={`nominated ${movie.imdbID}`}
              key={movie.imdbID}
            >
              <div className="movie">
                <img className="movie-poster" src={movie.Poster} alt=""></img>
                <div className="movie-title-container">
                  <p className="movie-title">
                    {movie.Title} <span className="year">({movie.Year})</span>
                  </p>
                </div>
              </div>
              <button
                className="un-nominate"
                id={movie.imdbID}
                onClick={unNominateMovie}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Nominations;
