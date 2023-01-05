import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import IngredientList from "./IngredientList";
import Instructions from "./Instructions";

const key = "2888d6f3f22a4a519637cdce7af6d06d";

const SingleRecipe = () => {
  const params = useParams();

  const result = useQuery(["recipes", params.id], fetchRecipe);
  const recipe = result?.data ?? {};
  if (result.isLoading) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-8 offset-2 mt-5">
            <div className="loading-pane">
              <h2 className="loader">🌀</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async function fetchRecipe({ queryKey }) {
    console.log("fetching");
    const id = queryKey[1];
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`
    );
    if (!res.ok) {
      throw new Error(`Fetching Recipe Details failed`);
    }
    const json = await res.json();
    return json;
  }

  return (
    <div className="container mt-3">
      <Link to="/" id="link-to-main">
        <img
          src="https://play-lh.googleusercontent.com/sjY0YeMySx9TQOFFJgbRa-hJlFICKIKy2sELJB1z4MCwKRxlXNkhvS5G72ZHvK4sqA=w240-h480-rw"
          alt="home"
          id="home-img"
        />
      </Link>
      <div className="row">
        <div className="col-lg-7 mt-5">
          <div className="card" id="recipe-card">
            <img src={recipe.image} alt="meal" className="card-img-top" />
            <div className="card-body">
              <h2 className="card-title">{recipe.title}</h2>
              <ul className="list-group mt-3">
                <li className="list-group-item">
                  ⌚ Ready in {recipe.readyInMinutes} minutes
                </li>
                {recipe.glutenFree === true ? (
                  <li className="list-group-item">🍀 Gluten Free!</li>
                ) : null}
                <li className="list-group-item">
                  🍕 Servings: {recipe.servings}
                </li>
                <li className="list-group-item">
                  💰 Price per serivng:{" "}
                  {Math.round(recipe.pricePerServing) / 100}$
                </li>
                <li className="list-group-item">
                  👩‍🍳 Cousine:{" "}
                  {recipe.cuisines ? recipe.cuisines.join(" ") : null}
                </li>
                <li className="list-group-item">
                  {recipe.healthScore >= 75 ? (
                    <span>😍</span>
                  ) : recipe.healthScore >= 50 ? (
                    <span>😃</span>
                  ) : recipe.healthScore >= 25 ? (
                    <span>🤨</span>
                  ) : recipe.healthScore > 0 ? (
                    <span>🤢</span>
                  ) : null}{" "}
                  Health Score: {recipe.healthScore}
                </li>
                <div className="card-footer">
                  <a href={recipe.spoonacularSourceUrl} id="recipe-a">
                    Original Recipe
                  </a>
                </div>
              </ul>
            </div>
          </div>
          <Instructions instructions={recipe.analyzedInstructions} />
        </div>
        <div className="col-lg-5">
          {recipe?.extendedIngredients ? (
            <IngredientList ingredients={recipe.extendedIngredients} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default function SingleRecipeBoundary(props) {
  return (
    <ErrorBoundary>
      <SingleRecipe {...props} />
    </ErrorBoundary>
  );
}
