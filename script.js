// search by title = https://www.omdbapi.com/?s=Guardians+of+the+Galaxy+Vol.+2&apikey=68658eb7

// search by ID =  http://www.omdbapi.com/?i=tt3896198&apikey=68658eb7

var apiKey = "68658eb7";

let moviesrc = document.getElementById("search");
let movieList = document.querySelector("#movie-list");
let movieDisplay = document.querySelector("#single-movie");

async function getMovie() {
    try {
        let moviesrc = document.getElementById("search").value;
        let url = `https://www.omdbapi.com/?s=${moviesrc}&apikey=${apiKey}`;
        let res = await fetch(url);
        let data = await res.json();

        if (moviesrc.length <= 2) {
            movieList.style.display = "none";
        } else {
            movieList.style.display = "block";
        }

        console.log("data: ", data);

        appendList(data);
    } catch (error) {
        console.log("error: ", error);
    }
}

function appendList(data) {
    movieList.innerHTML = null;
    data.Search.forEach((element) => {
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
    movieListSearch.forEach((movie) => {
        movie.addEventListener("click", async () => {
            try {
                console.log(movie.dataset.id);

                movieList.style.display = "none";
                moviesrc.value = "";

                let res2 = await fetch(
                    `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=${apiKey}`
                );
                let finalShow = await res2.json();

                console.log("finalShow: ", finalShow);
                displayFinalData(finalShow);
            } catch (error) {
                console.log("error: ", error);
            }
        });
    });
}

function displayFinalData(finalShow) {
    movieDisplay.innerHTML = `<div class="main-img">
                  <img
                    src="${finalShow.Poster}"
                    alt="${finalShow.Title}"
                />
                </div>
                <div class="main-content">
                <span class="recommend">${
                    finalShow.imdbRating >= 8 ? "Recommended" : ""
                }</span>
                <p class="title">${finalShow.Title}</p>
                  <ul>
                    <li>Year: ${finalShow.Year}</li>
                    <li>Rating: ${finalShow.imdbRating}/10</li>
                    <li>Released: ${finalShow.Released}</li>
                    </ul>
                    <p class="genre">Genre:  ${finalShow.Genre}</p>
                    <div class="content">
                    <p class="writer">Actors: ${finalShow.Actors}</p>
                    <p class="plot">Plot: ${finalShow.Plot}</p>
                    <p class="language">Language: ${finalShow.Language}</p>
                    </div>
                    </div>
                    <div class="mob-content">
                    <p class="writer">Actors: ${finalShow.Actors}</p>
                    <p class="plot">Plot: ${finalShow.Plot}</p>
                    <p class="language">Language: ${finalShow.Language}</p>
                    </div>
                `;
}

// function to go to popular page

function trending() {
    window.location.href = "/trending.html";
}

function homepage() {
    window.location.href = "/index.html";
}

ham = document.querySelector("#ham");

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
});

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
