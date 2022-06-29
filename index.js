const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e1541cc2189c20b3dbedd30523c1c5c9&page=1";

const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=e1541cc2189c20b3dbedd30523c1c5c9&query=";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerms = search.value;

  if (searchTerms && searchTerms != "") {
    getMovies(SEARCH_API + searchTerms);
  } else {
    window.location.reload();
  }
});

async function getMovies(url) {
  const emni = await fetch(url);
  const data = await emni.json();
  showMovies(data.results);
}

getMovies(API_URL);

function showMovies(movies) {
  console.log(movies);
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, backdrop_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      
            <img src="${IMAGE_PATH + backdrop_path}" alt = ${title}>
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>


      `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  }
  return "red";
}
