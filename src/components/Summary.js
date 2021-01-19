import React from "react";

const QuizSummary = ({ location }) => {
  //console.log(location.state);
  return !location.state ? (
    <h1>Forbidden</h1>
  ) : (
    <div className="mt-3">
      <h1
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        Quiz Score:{" "}
        
        <div className="text-success">{location.state.score.correct}</div>/{" "}
        <div> 3 </div>
      </h1>
      {/* Navigating Question Title */}
      {location.state.quiz.map((item, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-header bg-white">
            <div className="font-weight-bold">No.{index + 1}</div>{" "}
            {item.question}
          </div>
          <div className="card-body">
          {/* Navigating Options */}
            {item.options.map((item, index) => (
              <div
                style={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                  fontSize: 18,
                }}
                key={index}
              >
                <div
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 100,
                    backgroundColor: item?.selected ? "greenyellow" : "grey",
                    cursor: "pointer",
                    marginRight: 5,
                  }}
                />
                {item.title}
              </div>
            ))}
          </div>
          {/* Conditional Rendering */}
          <div className="card-footer bg-white">
            {item.options.find(
              (option) => option.correct && option.selected === option.correct
            ) ? (
              <div className="text-success">
                Your Answer: {item.options.find((item) => item.correct).title}
              </div>
            ) : (
              <>
                <div className="text-danger">
                  Your Answer :{" "}
                  {item.options.find((item) => item.selected)?.title ??
                    "No Option Selected"}
                </div>
                <div className="text-success">
                  Correct Answer :{" "}
                  {item.options.find((item) => item.correct).title}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizSummary;
