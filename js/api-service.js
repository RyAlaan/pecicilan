const url = "https://api.themoviedb.org/3/search/movie?";
const option = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTQ2Y2QxNjY1NmQ0MGVlMjA3NzdlOWMwMmJlNTU4OCIsIm5iZiI6MTc2NDIxOTYwMC44MzgsInN1YiI6IjY5MjdkYWQwNmE2NTA0MDI2M2MxMjQxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XcTm55IOUVdY0nwrEZa-XPdBsyYsUt-u11so7qLEd6o`,
  },
};

export async function request(query) {
  try {
    const response = await fetch(url + query, option).then((res) => res.json());
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
