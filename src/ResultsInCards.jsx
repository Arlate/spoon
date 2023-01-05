import { Link } from "react-router-dom";
const ResultsInCards = ({ results }) => {
  return (
    <div className="container">
      <div className="row">
        {results.map((res) => {
          return (
            <div className="col-md-4 col-xl-3" key={res.id}>
              <div className="card mt-3">
                <Link to={`/recipe/${res.id}`}>
                  <img src={res.image} alt="recipe" className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{res.title}</h5>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ResultsInCards;
