const baseUrl = "https://www.omdbapi.com/?apikey=";
const apiKey = "1f00160f";

const OMDB = {
  async getMovies(searchTerm) {
    try {
      const response = await fetch(
        `${baseUrl}${apiKey}&s=${searchTerm}&type=movie`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.Error) {
          return false;
        } else {
          return jsonResponse.Search;
        }
      }
    } catch (error) {
      return alert(error);
    }
  },

  async getFilmById(id) {
    try {
      const response = await fetch(`${baseUrl}${apiKey}&i=${id}`);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.Error) {
          return false;
        } else {
          return jsonResponse;
        }
      }
    } catch (error) {
      return alert(error);
    }
  },
};

export default OMDB;
