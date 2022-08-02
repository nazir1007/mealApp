const search = document.getElementById("search");
const mealsList = document.getElementById("meals-list");
const searchBtn = document.getElementById("search-btn");
const isFav = "fav";
const notFav = "!fav";
let meals = [];

//adding eventListner on keyup in searchBar
search.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  getResults(searchString);
});

//added eventlistner to searchButton
searchBtn.addEventListener("click", () => {
  const searchString = search.value.toLowerCase();
  getResults(searchString);
});

//making api call and getting results on the basis of key
const getResults = async (searchString) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchString}`
    );
    meals = await response.json();
    if (searchString.length < 3) {
      meals.meals = 1;
    }
    displayResults(meals.meals);
  } catch (error) {
    console.log(error);
  }
};

//displaying results on the basis of searchresults from an API Call and adding it to the DOM
const displayResults = (meals) => {
  let arr = JSON.parse(localStorage.getItem("favMeals"));
  if (meals === null) {
    mealsList.innerHTML = "<h1> No Meal Availaible With This Name</h1>";
  } else if (meals === 1) {
    mealsList.innerHTML = '<h1 style="color:red;"></h1>';
  } else {
    const mealString = meals
      .map((meal) => {
        const recipeId = meal.idMeal;
        const isFav = false;
        if (arr.indexOf(recipeId) != -1) {
          isFav == true;
        }
        return `<li class="meal">
            <img src="${meal.strMealThumb}" /img>
             <div class="meal-name" id="${meal.idMeal}">
             <h2 class="recipe-name">${meal.strMeal}</h2> 
             <i class="${isFav ? "fav" : "!fav"} fa-solid fa-heart fav-btn"></i>
             </div>
             </li>`;
      })
      .join("");
    mealsList.innerHTML = mealString;
  }
};

//initializing localStorage
function initializeLocalstorage() {
  let arr = [];
  if (localStorage.getItem("favMeals") == null) {
    //create a new localStorage
    localStorage.setItem("favMeals", JSON.stringify(arr));
  }
}

//adding event listner on the meal items present in the DOM
const searchList = document.getElementById("meals-list");
searchList.addEventListener("click", (e) => {
  if (e.target.className == "recipe-name") {
    const recipeId = e.target.parentNode.id;
    window.open(`detail.html?id=${recipeId}`);
  } else if (e.target.classList.contains("fav-btn")) {
    const recipeId = e.target.parentNode.id;

    let arr = JSON.parse(localStorage.getItem("favMeals"));
    if (arr.indexOf(recipeId) != -1) {
      arr = arr.filter((item) => item != recipeId);
      localStorage.setItem("favMeals", JSON.stringify(arr));
      e.target.classList.remove("fav");
      e.target.classList.add("!fav");
    } else {
      arr.push(recipeId);
      localStorage.setItem("favMeals", JSON.stringify(arr));
      e.target.classList.remove("!fav");
      e.target.classList.add("fav");
      alert("Added to Favourites");
    }
  }
});

//calling initializelocalStorage when DOM is Loaded
document.addEventListener("DOMContentLoaded", initializeLocalstorage);
