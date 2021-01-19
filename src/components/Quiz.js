import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { quiz as quizData } from "../components/questions";
import { Container, Row, Col } from "react-bootstrap";

const Quiz = ({ location }) => {
  // Index for navigating to the question with currentIndex
  const [currentIndex, setCurrentIndex] = useState(0);
  //Update Quiz
  const [quiz, setQuiz] = useState(quizData);
  //Setting Score
  const [score, setScore] = useState({
    correct: 0,
    false: 0,
  });
  //Destructuring quiz
  const { id, question, options } = quiz[currentIndex];

  const checkScore = () => {
    const questionAnswered = quiz.filter((item) => item.selected);
    const questionCorrect = questionAnswered.filter((item) =>
      item.options.find(
        (option) => option.correct && option.selected === option.correct
      )
    );
    setScore({
      correct: questionCorrect.length,
      false: quiz.length - questionCorrect.length,
    });
  };

  useEffect(() => {
    checkScore();
  }, [quiz]);

  //Condition for button NEXT
  const nextQuestion = () => {
    if (quiz.length - 1 === currentIndex) return;
    setCurrentIndex(currentIndex + 1);
  };

  //Condition for button PREVIOUS
  const previousQuestion = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };
  //SELECTING RADIO OPTION
  const selectOption = (indexSelected, indexOptionSelected) => {
    setQuiz(
      quiz.map((item, index) =>
        index === indexSelected
          ? {
              ...item,
              selected: true,
              options: options.map((item, index) =>
                index === indexOptionSelected
                  ? { ...item, selected: true }
                  : { ...item, selected: false }
              ),
            }
          : item
      )
    );
  };
  //console.log(quiz)
  return (
    <Row>
      <Col>
        <div>
          <h2 className="text-center mb-3 mt-3 border">Review Answer Here</h2>

          {quiz.map((x, i) => {
            return (
              <div>
                  {x.options.map((item,index) => item.selected ? <h3 className="text-center border">{i+1}. {item.title}</h3> : <p></p>)}
                
              </div>
            );
          })}
          </div>
      </Col>
      <Container>
        <Col xs={8}>
          <div>
            <h2 className="text-center mb-3 mt-3 border">Attempt Quiz Here</h2>
            {/* Question Navigation from the boxes */}
            <div className="card mb-3">
              <div
                className="card-body"
                style={{
                  display: "flex",
                  padding: 10,
                  flexWrap: "wrap",
                }}
              >
              {/* Navigation the tittle of question */}
                {quiz.map((item, index) => (
                  <div
                    key={index}
                    className="border border-primary font-weight-bold"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      width: 40,
                      marginRight: 5,
                      marginBottom: 5,
                      borderRadius: 5,
                      cursor: "pointer",
                      backgroundColor:
                        index === currentIndex
                          ? "greenyellow "
                          : item?.selected
                          ? "grey"
                          : "transparent",
                    }}
                    onClick={() => setCurrentIndex(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div
                className="card-header bg-white font-weight-bold"
                style={{
                  fontSize: 20,
                }}
              >
                {currentIndex + 1}. {question}
              </div>
              <div className="card-body">
              {/* Navigating the Options */}
                {options.map((item, index) => (
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
                        backgroundColor: item?.selected ? "yellow" : "grey",
                        cursor: "pointer",
                        marginRight: 5,
                      }}
                      onClick={() => selectOption(currentIndex, index)}
                    />
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 10,
              }}
            >
              <button
                className="btn btn-info col-sm-2"
                onClick={() => previousQuestion()}
                disabled={currentIndex === 0 ? true : false}
              >
                Previous
              </button>
              {quiz.length - 1 === currentIndex ? (
                <Link
                  className="btn btn-success col-sm-2"
                  to={{
                    pathname: "/summary",
                    state: {
                      quiz,
                      score,
                    },
                  }}
                >
                  Finish
                </Link>
              ) : (
                <button
                  className="btn btn-primary col-sm-2"
                  onClick={() => nextQuestion()}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </Col>
      </Container>
    </Row>
  );
};

export default Quiz;
