let favMeals = JSON.parse(localStorage.getItem("favMeals"));
const mealsList = document.getElementById("meals-list");

//fetching meals present in Local storage from api
const fetchData = async (mealId) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    displayResults(data.meals[0]);
  } catch (error) {
    console.log(error);
  }
};

//showing favourite meals present in local Storage
const showFav = () => {
  if (favMeals.length === 0) {
    console.log("favMeals");
    mealsList.innerHTML = "<h1>Favourite Meals List is Empty!</h1>";
  } else {
    mealsList.innerHTML = "";
    //  console.log(favMeals);
    favMeals.map((mealId) => {
      const mealData = fetchData(mealId);
    });
  }
};

//displaying fav meals in dom
const displayResults = (meal) => {
  let isFav = true;
  mealsList.innerHTML += `<li class="meal">
    <img src="${meal.strMealThumb}" /img>
     <div class="meal-name" id="${meal.idMeal}">
     <h2 class="recipe-name">${meal.strMeal}</h2> 
     <i class="${isFav ? "fav" : "!fav"} fa-solid fa-heart fav-btn"></i>
     </div>
     </li>`;
};

//adding evenlistner click on heart button and recipe name
mealsList.addEventListener("click", (e) => {
  if (e.target.className == "recipe-name") {
    const recipeId = e.target.parentNode.id;
    window.open(`detail.html?id=${recipeId}`);
  } else if (e.target.classList.contains("fav-btn")) {
    const recipeId = e.target.parentNode.id;
    let arr = JSON.parse(localStorage.getItem("favMeals"));
    arr = arr.filter((item) => item != recipeId);
    localStorage.setItem("favMeals", JSON.stringify(arr));
    favMeals = JSON.parse(localStorage.getItem("favMeals"));
    alert("Removed From Favourites");
    showFav();
  }
});

showFav();
