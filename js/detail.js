import { request } from "./api-service.js";

const url = "https://api.themoviedb.org/3/movie/";
const navbar = document.querySelector(".navbar");
const hero = document.querySelector(".hero");

const title = document.querySelector(".title");
const year = document.querySelector(".year");
const heroTitle = document.querySelector(".hero-title");
const playButton = document.querySelector(".play");
const badge = document.querySelector(".badge");
const genreList = document.querySelector(".genre-list");
const desc = document.querySelector(".desc");
const heroImg = document.querySelector(".hero-img");
const directorImg = document.querySelector(".director-img");
const directorName = document.querySelector(".director-name");
const directorJob = document.querySelector(".director-job");
const starRating = document.querySelector(".stars");
const ratingValue = document.querySelector(".rating-value");
const recommendationList = document.querySelector(".recommendation-list");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function fetchDetail() {
  try {
    const data = await request(
      `${url}${id}?append_to_response=recommendations%2Crelease_dates%2Ccredits%2Cvideos&language=en-US`
    );

    hero.style.setProperty(
      "--backdrop",
      `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
    );

    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = data.title;

    const year = document.createElement("h1");
    year.classList.add("year");
    year.textContent = `(${data.release_date.split("-")[0]})`;

    heroTitle.appendChild(title);
    heroTitle.appendChild(year);

    playButton.href = `https://www.youtube.com/watch?v=${data.videos.results[0].key}`;

    const usRelease = data.release_dates.results.find(
      (release) => release.iso_3166_1 === "US"
    );

    let usRating = usRelease.release_dates.find(
      (r) => r.certification !== ""
    )?.certification;

    // looping genre
    data.genres.forEach((g) => {
      const genre = document.createElement("div"); // or "div"
      genre.classList.add("genre");
      genre.textContent = g.name;
      genreList.appendChild(genre);
    });

    desc.textContent = data.overview;

    heroImg.src = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
    heroImg.alt = data.title;

    const director = data.credits.crew.find(
      (member) => member.job === "Director"
    );

    directorImg.src = `https://image.tmdb.org/t/p/original${director.profile_path}`;
    directorImg.alt = director.name;
    directorName.textContent = director.name;
    directorJob.textContent = director.job;

    const rating = data.vote_average / 2;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    // full stars
    for (let i = 0; i < fullStars; i++) {
      const starIcon = document.createElement("i");
      starIcon.classList.add("icon");
      starIcon.dataset.lucide = "star";
      starRating.appendChild(starIcon);
    }

    // half star
    if (halfStar) {
      const halfStarIcon = document.createElement("i");
      halfStarIcon.classList.add("icon");
      halfStarIcon.dataset.lucide = "star-half";
      starRating.appendChild(halfStarIcon);
    }

    ratingValue.textContent = rating.toFixed(1);

    const recommendationSliced = data.recommendations.results.slice(0, 6);

    recommendationSliced.forEach((movie) => {
      const recommendationCard = document.createElement("a");
      recommendationCard.href = `detail.html?id=${movie.id}`;
      recommendationCard.classList.add("recommendation-card");

      const recommendationImg = document.createElement("img");
      recommendationImg.classList.add("recommendation-img");
      recommendationImg.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
      recommendationImg.alt = movie.title;

      const recommendationTitle = document.createElement("p");
      recommendationTitle.classList.add("recommendation-title");
      recommendationTitle.textContent = movie.title;

      const recommendationRating = document.createElement("span");
      recommendationRating.classList.add("recommendation-rating");
      recommendationRating.textContent = movie.vote_average.toFixed(1);

      recommendationCard.appendChild(recommendationImg);
      recommendationCard.appendChild(recommendationTitle);
      recommendationCard.appendChild(recommendationRating);

      recommendationList.appendChild(recommendationCard);
    });
  } catch (error) {
    console.error(error);
  }
}

fetchDetail();
