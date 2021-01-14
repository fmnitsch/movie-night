const baseUrl = "https://movies-db-api-fmn.herokuapp.com/api/movies";

const Ranking = {
  async getMovieIdList() {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse) {
          return jsonResponse;
        }
      }
    } catch (error) {
      alert(error);
    }
  },

  async submitNominations(entry) {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie: entry }),
    };
    try {
      const response = await fetch(baseUrl, fetchOptions);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse) {
        }
      }
    } catch (error) {
      alert(error);
    }
  },
};

export default Ranking;
