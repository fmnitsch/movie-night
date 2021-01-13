import React from "react";
import "./App.css";
import OMDB from "./OMDB";
import SearchBar from "./Components/SearchBar/SearchBar";
import Results from "./Components/Results/Results";
import Picks from "./Components/Picks/Picks";

class App extends React.Component {
  state = {
    searchTerm: "",
    searchResults: [],
    nominations: [],
  };

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  componentDidMount() {
    let previousState = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      previousState.push(JSON.parse(localStorage.getItem(key)));
    }

    this.setState({
      nominations: previousState[1],
    });

    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    this.saveStateToLocalStorage();
  }

  updateSearchTerm = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  search = async (term) => {
    const results = await OMDB.getMovies(term);
    if (term.length === 0) {
      this.setState({ searchResults: [] });
    } else if (results === false) {
      return;
    } else {
      this.setState({ searchResults: results });
    }
  };

  nominateMovie = async (id) => {
    const movieToNominate = await OMDB.getFilmById(id);
    let tempArr = this.state.nominations;
    if (this.state.nominations.length >= 5) {
      return;
    } else {
      tempArr.push(movieToNominate);
      this.setState({ nominations: tempArr });
    }
  };

  unNominateMovie = async (id) => {
    const UnNominatedMovie = await OMDB.getFilmById(id);
    let tempArr = this.state.nominations.filter((nominatedMovie) => {
      return nominatedMovie.imdbID !== UnNominatedMovie.imdbID;
    });
    this.setState({ nominations: tempArr });
  };

  render() {
    return (
      <div className="App">
        <div className="welcome-section">
          <h1>Movie Night!</h1>
          <p>
            Pick out the top 5 movies on your must-watch list and never lose
            track of them!
          </p>
          <SearchBar
            search={this.search}
            searchTerm={this.state.searchTerm}
            updateSearchTerm={this.updateSearchTerm}
          />
          <Results
            searchTerm={this.state.searchTerm}
            searchResults={this.state.searchResults}
            nominateMovie={this.nominateMovie}
            nominations={this.state.nominations}
          />
        </div>
        <Picks
          nominations={this.state.nominations}
          unNominateMovie={this.unNominateMovie}
        />
      </div>
    );
  }
}

export default App;
