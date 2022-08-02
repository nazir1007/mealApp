const queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
const recipeId = urlParams.get("id");

//getiing details from api
const getDetails = async (recipeId) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    );
    let data = await response.json();
    console.log(data);
    showDetails(data);
  } catch (error) {
    console.log(error);
  }
};

//adding details on dom
const showDetails = (meal) => {
  const photo = document.getElementById("main-image");
  photo.innerHTML = `<img src=${meal.meals[0].strMealThumb}>`;
  const name = document.getElementById("meal-name");
  name.innerText = meal.meals[0].strMeal;
  const instruction = document.getElementById("instruction");
  instruction.innerText = meal.meals[0].strInstructions;
  const catogery = document.getElementById("category");
  catogery.innerText = meal.meals[0].strCategory;
  // const area = document.getElementById("area");
  // area.innerText = meal.meals[0].strArea;
};

getDetails(recipeId);
