import { request } from "./api-service.js";

const inputSearch = document.querySelector('input[name="searchInput"]');

// suggestion list
const suggestionList = document.querySelector(".suggestionList");

let searchTimeout;

// event listener for search input
inputSearch.addEventListener("keyup", (e) => {
  const searchValue = e.target.value;

  clearTimeout(searchTimeout);

  // call search value after 600ms of inactivity
  searchTimeout = setTimeout(() => {
    request(`query=${encodeURIComponent(searchValue)}`).then((data) => {
      console.log(data);

      suggestionList.innerHTML = "";

      // mapping results
      data.results.forEach((element) => {
        console.log(element);

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
