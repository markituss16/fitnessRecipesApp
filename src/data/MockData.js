import { recipes, ingredients } from './dataArrays';

export function getAllIngredients() {
    const ingredientsArray = [];
    ingredients.map((ingredient, index) => {
          ingredientsArray.push([ingredient, index]);
    });
  return ingredientsArray;
}

export function getRecipes() {
  const recipesArray = [];
  recipes.map((recipe, index) => {
        recipesArray.push([recipe, index]);
  });
  return recipesArray;
}

export function getRecipesByRecipeName(recipeName) {
  const nameUpper = recipeName.toUpperCase();
  const recipesArray = [];
  recipes.map(data => {
    if (data.title.toUpperCase().includes(nameUpper)) {
      recipesArray.push(data);
    }
  });
  return recipesArray;
}