import { request } from "./api-service.js";

const url =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&";

const inputSearch = document.querySelector('input[name="searchInput"]');

// suggestion list
const suggestionList = document.querySelector(".suggestionList");

// recomendation list
const slider = document.getElementById("slider");
const slideLeft = document.getElementById("slideLeft");
const slideRight = document.getElementById("slideRight");

//sliding effect
const trendingSlider = document.getElementById("slider");

//tranding

let searchTimeout;

// event listener for search input
inputSearch.addEventListener("keyup", (e) => {
  const searchValue = e.target.value;

  clearTimeout(searchTimeout);

  // call search value after 600ms of inactivity
  searchTimeout = setTimeout(() => {
    request(url + `query=${encodeURIComponent(searchValue)}`).then((data) => {
      suggestionList.innerHTML = "";

      // mapping results
      data.results.forEach((element) => {
        const suggestionItem = document.createElement("a");

        suggestionItem.href = `./detail.html?id=${element.id}`;
        suggestionItem.classList.add("suggestionItem");

        const suggestionImage = document.createElement("img");

        suggestionImage.src = `https://image.tmdb.org/t/p/original${element.poster_path}`;
        suggestionImage.alt = element.title;
        suggestionImage.classList.add("suggestionImage");

        suggestionItem.appendChild(suggestionImage);

        const suggestionTitle = document.createElement("p");

        suggestionTitle.textContent = element.title;
        suggestionTitle.classList.add("suggestionTitle");

        suggestionItem.appendChild(suggestionTitle);

        suggestionList.appendChild(suggestionItem);
      });
    });
  }, 600);
});

slideRight.addEventListener("click", () => {
  slider.scrollBy({ left: 300, behavior: "smooth" });
});

slideLeft.addEventListener("click", () => {
  slider.scrollBy({ left: -300, behavior: "smooth" });
});

request("https://api.themoviedb.org/3/trending/movie/day?language=en-US")
  .then((data) => {
    console.log("TRENDING:", data); // DEBUG

    trendingSlider.innerHTML = "";

    data.results.slice(0, 10).forEach((movie, index) => {
      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Image";

      const item = document.createElement("a");
      item.classList.add("trending-item");
      item.href = `./detail.html?id=${movie.id}`;

      const itemImage = document.createElement("img");
      itemImage.src = poster;

      item.appendChild(itemImage);

      trendingSlider.appendChild(item);
    });
  })
  .catch((err) => console.error("TRENDING ERROR:", err));
