const IngredientList = ({ ingredients }) => {
  return (
    <div className="container p-0">
      <div className="row">
        <div className="col mt-5 mb-5">
          <div className="card border-dark">
            <div className="card-header">
              <h4 className="mb-0">Ingredients</h4>
            </div>
            <ul className="list-group">
              {ingredients
                ? ingredients.map((ingredient) => (
                    <li
                      className="list-group-item"
                      id="list-ingredient"
                      key={ingredient.id}
                    >
                      {ingredient.image ? (
                        <img
                          src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`}
                          alt="ingredient"
                          id="ingredient-img"
                        />
                      ) : null}
                      <span className="ingredient-desc">
                        {ingredient.name} - {ingredient.amount ?? null}{" "}
                        {ingredient.unit}
                      </span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientList;
