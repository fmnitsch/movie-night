import { useEffect } from "react";
import "./Results.css";

function Results(props) {
  const checkNomination = (button) => {
    if (props.nominations.some((movie) => movie.imdbID === button.id)) {
      button.style.opacity = "50%";
    } else {
      button.style.opacity = "100%";
    }
  };

  const nominationAnimation = (id) => {
    const resultsmovieCard = document.querySelector(`.${id}`);

    resultsmovieCard.classList.add("onClick");
    setTimeout(() => {
      resultsmovieCard.classList.remove("onClick");
    }, 500);
  };

  const nominateMovie = (e) => {
    const button = document.getElementById(e.target.id);
    if (props.nominations.some((movie) => movie.imdbID === e.target.id)) {
      return;
    } else {
      nominationAnimation(e.target.id);
      props.nominateMovie(e.target.id);
      button.style.opacity = "50%";
    }
  };

  useEffect(() => {
    const buttons = document.querySelectorAll(".nominate");
    const resultsHeader = document.querySelector(".results-header");

    buttons.forEach((button) => checkNomination(button));

    props.searchResults.length > 0
      ? (resultsHeader.style.visibility = "visible")
      : (resultsHeader.style.visibility = "hidden");

    if (props.nominations.length === 5) {
      buttons.forEach((button) => (button.style.opacity = "50%"));
    }
  });

  return (
    <div className="results-container">
      <h3 className="results-header">Results for "{props.searchTerm}"</h3>
      <div className="movie-list-container">
        {props.searchResults.map((movie) => {
          return (
            <div className={`movie-card ${movie.imdbID}`} key={movie.imdbID}>
              <div className="movie">
                <img className="movie-poster" src={movie.Poster} alt=""></img>
                <div className="movie-title-container">
                  <p className="movie-title">
                    {movie.Title} <span className="year">({movie.Year})</span>
                  </p>
                </div>
              </div>
              <button
                className="nominate"
                id={movie.imdbID}
                onClick={nominateMovie}
              >
                Pick
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Results;
