const apiKeyInput =document.getElementById("apiKeyInput");
const movieTitleInput = document.getElementById("movieTitleInput");
const searchButton = document.getElementById("searchButton");
const loader = document.getElementById("loader");
const resultsContainer = document.getElementById("results");


searchButton.addEventListener('click' , async () => {
    let number =0;
  const apiKey = apiKeyInput.value.trim();
  const movieTitle = movieTitleInput.value.trim();

  if(!apiKey || !movieTitle){
    alert("Please Enter both API Key and Movie Title");
    return;
  }

  loader.style.display="block";
  resultsContainer.innerHTML="";
  
  try {
    const response = await fetch(`http://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`);
    const data = await response.json();
    console.log(data);
    if (data.Response === 'True'){
        const movies = data.Search;

        movies.forEach(movie => {

            const movieCard = document.createElement('div');
            movieCard.classList.add("movie-card");
            if(movie.Poster ==='N/A'){ 
                movieCard.innerHTML = `
            <img src="./images/ErrorImages.png "alt ="${movieTitle}" class = "movie-poster">
            <div class="movie-number">
            <p >${(number=number+1)}</p>
            </div>
            <h4 class = "movie-details">${movie.Title} (${movie.Year})</h4>
            <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">More Details</a>
            `;
            resultsContainer.appendChild(movieCard);
            }
            else{
           
            movieCard.innerHTML = `
            <img src= "${movie.Poster}" alt ="${movieTitle}" class = "movie-poster">
            <div class="movie-number">
            <p class="number" >${(number=number+1)}</p>
            </div>
            <h4 class = "movie-details">${movie.Title} (${movie.Year})</h4>
            <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">More Details</a>
            `;
            resultsContainer.appendChild(movieCard);
            }
           
        });
    }
    else {
            alert("No movies fond");
        }
    }
   catch (error) {
    alert("An error occurred. Please check your API key and try again.");
  }
  loader.style.display="none";
});