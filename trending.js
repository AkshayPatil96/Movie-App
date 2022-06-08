let trend = document.querySelector("#trend");

let data;

async function upcoming() {
    try {
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=a6cf3086a56f3bb3410ef41f3966d456&language=en-US&page=1`;

        let res = await fetch(url);

        let data = await res.json();

        movies(data);
    } catch (err) {
        console.log("err: ", err);
    }
}

// upcoming();

async function latest() {
    try {
        let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=a6cf3086a56f3bb3410ef41f3966d456&language=en-US&page=1`;

        let res = await fetch(url);

        let data = await res.json();

        movies(data)
    } catch (err) {
        console.log('err: ', err);
    }
}

// latest();

async function trendingMovies() {
    try {
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=a6cf3086a56f3bb3410ef41f3966d456&language=en-US&page=1`;

        let res = await fetch(url);

        let data = await res.json();

        movies(data);

        console.log("data: ", data);
    } catch (error) {
        console.log("error: ", error);
    }
}

trendingMovies();

function movies(data) {
    document.querySelector("#trend").innerHTML = "";
    data.results.forEach(function (element) {
        let div = document.createElement("div");
        div.classList.add("single-movie");

        let image = document.createElement("img");
        image.src = `https://image.tmdb.org/t/p/w500/${element.poster_path}`;

        let title = document.createElement("p");
        title.innerText = element.title;
        title.classList.add("name");

        let div2 = document.createElement("div");
        div2.classList.add("date-rating");

        let release = document.createElement("p");
        release.innerText = element.release_date;
        release.classList.add("date");

        let vote = document.createElement("p");
        vote.innerText = `${element.vote_average}/10`;
        vote.classList.add("rating");

        div2.append(release, vote);
        div.append(image, title, div2);
        trend.append(div);
    });
}

//--------------------------------------------------------

var apiKey = "68658eb7";

let moviesrc = document.getElementById("search");
let movieList = document.querySelector("#movie-list");
let movieDisplay = document.querySelector("#single-movie");

async function getMovie() {
    try {
        let moviesrc = document.getElementById("search").value;
        let url = `https://www.omdbapi.com/?s=${moviesrc}&apikey=${apiKey}`;
        let res = await fetch(url);
        let data2 = await res.json();

        if (moviesrc.length <= 2) {
            movieList.style.display = "none";
        } else {
            movieList.style.display = "block";
        }
        console.log("data: ", data);
        appendList(data2);
    } catch (error) {
        console.log("error: ", error);
    }
}

getMovie();

function appendList(data2) {
    movieList.innerHTML = null;
    data2.Search.forEach((element) => {
        let div = document.createElement("div");
        div.dataset.id = element.imdbID;
        div.classList.add("list");

        let div2 = document.createElement("div");
        div2.classList.add("li-image");

        let poster = document.createElement("img");
        poster.src = element.Poster;
        poster.alt = element.Title;
        poster.classList.add("list-img");

        let div3 = document.createElement("div");
        div3.classList.add("movie-list-details");

        let title = document.createElement("h4");
        title.innerText = element.Title;

        let year = document.createElement("p");
        year.innerText = element.Year;

        let type = document.createElement("p");
        type.innerText = element.Type;

        div2.append(poster);
        div3.append(title, year, type);
        div.append(div2, div3);
        movieList.append(div);
    });
    movieDetails();
}

function movieDetails() {
    let movieListSearch = document.querySelectorAll(".list");
    // console.log('movieList: ', movieList);
    movieListSearch.forEach((movie) => {
        movie.addEventListener("click", async () => {
            try {
                console.log(movie.dataset.id);

                movieList.style.display = "none";
                moviesrc.value = "";

                let res2 = await fetch(
                    `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=${apiKey}`
                );
                let finalShow = await res2.json();

                console.log("finalShow: ", finalShow);
                window.location.href = "/index.html";
                // displayFinalData(finalShow);
            } catch (error) {
                console.log("error: ", error);
            }
        });
    });
}

// debouncing function

let timerid;
async function main() {
    try {
        let data = await getMovie();
        console.log("data: ", data);

        if (data === undefined) {
            return false;
        }
        appendList(data);
    } catch (error) {
        console.log(error);
    }
}

main();

function debounce(func, delay) {
    if (timerid) {
        clearTimeout(timerid);
    }

    timerid = setTimeout(function () {
        func();
    }, delay);
}

//========================================================
ham = document.querySelector("#ham");

function homepage() {
    window.location.href = "/index.html";
}

function popular() {
    // ham.style.display = "none";
    window.location.href = "/trending.html";
}

function openHam() {
    ham.style.display === "none"
        ? (ham.style.display = "flex")
        : (ham.style.display = "none");
}

function closeHam() {
    ham.style.display = "none";
}

window.addEventListener("click", () => {
    movieList.style.display = "none";
    // ham.style.display = "none";
});
