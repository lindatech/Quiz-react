import React from "react";

export const Card = (props) => {
  const { question, nextQuestion, checkAnswer1, success, selected } = props;
  const checkAnswer = (userAns, index, correct) => {
    checkAnswer1(userAns, index, correct);
  };
  const nextQuestion1 = () => {
    nextQuestion();
  };
  const ans = success === 0 ? "" : success === 1 ? "green" : "red";
  return (
    <div className="card" key={question.id}>
      <div className="card-body">
        <h5 className="card-title">{question.question}</h5>
        <ul className="list-group">
          {question.answers.map((el, index) => (
            <li
              key={index}
              className={
                index === selected
                  ? `list-group-item ${ans}`
                  : "list-group-item"
              }
              onClick={() => {
                checkAnswer(el, index, question.correct);
              }}
            >
              {el}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
          onClick={nextQuestion1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
