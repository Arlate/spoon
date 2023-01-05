import { useEffect, useState } from "react";
import ResultsInCards from "./ResultsInCards";
import { o } from "./seac";
import ErrorBoundary from "./ErrorBoundary";

const key = "2888d6f3f22a4a519637cdce7af6d06d";
const SearchRecipe = () => {
  const [currRecipe, setRecipe] = useState(o);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  useEffect(() => {
    requestRecipes();
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestRecipes() {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&query=${search}`
    );
    const json = await res.json();
    setRecipe(json.results);
  }
  return (
    <div className="container mt-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          setSearch(formData.get("search"));
          setSearchField("");
        }}
      >
        <label htmlFor="search" className="form-label">
          Search for recipe
          <input
            type="text"
            id="search"
            name="search"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="form-control"
          />
        </label>
        <button className="btn btn-primary ms-2">Submit</button>
      </form>
      <ResultsInCards results={currRecipe} />
    </div>
  );
};

export default function SearchRecipeBoundary(props) {
  return (
    <ErrorBoundary>
      <SearchRecipe {...props} />
    </ErrorBoundary>
  );
}
