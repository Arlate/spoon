import { useState } from "react";

const Instructions = ({ instructions }) => {
  const [bigPage, setBigPage] = useState(0);
  const [smallPage, setSmallPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  async function changePage(action) {
    console.log(bigPage, smallPage);
    if (action === "next") {
      //   console.log(instructions[bigPage].steps.length);
      if (smallPage + 1 < instructions[bigPage].steps.length) {
        setSmallPage(smallPage + 1);
        setCurrPage(currPage + 1);
      } else if (bigPage + 1 < instructions.length) {
        setSmallPage(0);
        setBigPage(bigPage + 1);
        setCurrPage(currPage + 1);
      }
    } else if (action === "prev") {
      if (smallPage > 0) {
        setSmallPage(smallPage - 1);
        setCurrPage(currPage - 1);
      } else if (bigPage > 0) {
        setBigPage(bigPage - 1);
        setSmallPage(instructions[bigPage - 1].steps.length - 1);
        setCurrPage(currPage - 1);
      }
    }
  }
  if (instructions?.[bigPage]?.steps?.[smallPage]?.step) {
    const allPages = instructions.reduce(
      (acc, val) => acc + val.steps.length,
      0
    );
    return (
      <div className="card text-bg-light mt-5" id="card-instruct">
        {instructions[bigPage].name ? (
          <div className="card-header" id="instruction-header">
            {instructions[bigPage].name}
          </div>
        ) : null}
        <div className="card-body text-center">
          {instructions?.[bigPage]?.steps?.[smallPage]?.equipment
            ? instructions[bigPage].steps[smallPage].equipment.map((eq) => {
                return (
                  <img
                    src={`https://spoonacular.com/cdn/equipment_250x250/${eq.image}`}
                    alt="tool"
                    key={eq.id}
                    className="card-img-top"
                    id="eq-image"
                  ></img>
                );
              })
            : null}
          <div className="card-text text-center">
            {instructions[bigPage].steps[smallPage].step}
          </div>
          <div className="container mt-3" id="instruction-btn">
            <div className="row">
              <div className="col-5 text-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    changePage("prev");
                  }}
                >
                  Previous Step
                </button>
              </div>
              <div className="col-2 text-center mt-2">
                {currPage}/{allPages}
              </div>
              <div className="col-5 text-start">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    changePage("next");
                  }}
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Instructions;

// return (
//     <div>
//       {instructions
//         ? instructions.map((bigStep) => {
//             return (
//               <div key={bigStep.name}>
//                 {bigStep.name}
//                 <ol>
//                   {bigStep.steps.map((smallStep) => {
//                     return (
//                       <li key={smallStep.number}>
//                         {smallStep.step} <br />
//                         {smallStep.equipment
//                           ? smallStep.equipment.map((eq) => {
//                               return (
//                                 <img
//                                   src={`https://spoonacular.com/cdn/equipment_250x250/${eq.image}`}
//                                   alt="tool"
//                                   key={eq.id}
//                                 ></img>
//                               );
//                             })
//                           : null}
//                       </li>
//                     );
//                   })}
//                 </ol>
//               </div>
//             );
//           })
//         : null}
//     </div>
//   );
