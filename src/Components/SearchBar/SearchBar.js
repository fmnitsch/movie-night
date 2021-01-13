import "./SearchBar.css";

function SearchBar(props) {
  const updateSearchTerm = (e) => {
    props.updateSearchTerm(e);
    props.search(e.target.value);
  };

  return (
    <div className="search-bar">
      <p className="input-instructions">Start typing a movie title</p>
      <input
        className="input"
        type="search"
        placeholder="Search"
        results="0"
        onChange={updateSearchTerm}
      ></input>
    </div>
  );
}

export default SearchBar;
