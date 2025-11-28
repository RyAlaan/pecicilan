import { request } from "./api-service.js";

const inputSearch = document.querySelector('input[name="searchInput"]');
let searchTimeout;

// event listener for search input
inputSearch.addEventListener("input", (e) => {
  const searchValue = e.target.value;

  clearTimeout(searchTimeout);

  // call search value after 600ms of inactivity
  searchTimeout = setTimeout(() => {
    request(`query=${encodeURIComponent(searchValue)}`);
  }, 600);
});
