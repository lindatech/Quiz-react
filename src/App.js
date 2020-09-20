import React from "react";
import "./styles.css";
import { Card } from "./card";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      curQIndex: -1,
      totalQuestion: 0,
      start: false,
      success: 0,
      selected: -1
    };
  }
  checkAnswer1 = (userAns, index, correct) => {
    var success = 0;
    success = userAns === correct ? 1 : 2;
    this.setState({
      success: success,
      selected: index
    });
  };

  getQues = () => {
    this.getQuestions().then((data) => {
      var questions = data.map((el, index) => {
        var correct = el.correct_answer;
        var question = el.question;
        var answers = [...el.incorrect_answers, correct];
        answers = this.shuffleArray(answers);
        return {
          id: index,
          question: question,
          answers: answers,
          correct: correct
        };
      });
      this.setState({
        questions: questions,
        totalQuestion: questions.length,
        curQIndex: 1,
        start: true,
        selected: -1,
        success: 0
      });
    });
  };
  shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }
    return array;
  };
  async getQuestions() {
    var resp = await fetch(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    var data = await resp.json();
    var results = await data.results;
    return results;
  }

  generateQuestion = () => {
    this.getQues();
  };

  nextQuestion = () => {
    if (this.state.curQIndex < this.state.totalQuestion) {
      this.setState((prevState) => ({
        curQIndex: prevState.curQIndex + 1
      }));
    } else {
      this.setState({
        start: false
      });
    }
    this.setState({
      selected: -1,
      success: 0
    });
  };

  render() {
    const {
      start,
      questions,
      curQIndex,
      totalQuestion,
      success,
      selected
    } = this.state;
    var item =
      curQIndex !== -1 ? (
        <div>
          <p>
            {curQIndex} / {totalQuestion}
          </p>
          <Card
            question={questions[curQIndex - 1]}
            success={success}
            selected={selected}
            nextQuestion={this.nextQuestion}
            checkAnswer1={this.checkAnswer1}
          />
        </div>
      ) : (
        ""
      );

    return (
      <div className="App">
        <h1 className="quiz" style={{ marginBottom: "20px" }}>
          Quiz
        </h1>
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginBottom: "20px" }}
          onClick={this.generateQuestion}
        >
          Start Quiz
        </button>
        {start ? item : ""}
      </div>
    );
  }
}

export default App;
