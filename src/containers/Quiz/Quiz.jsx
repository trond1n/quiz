import React, { Component } from "react";
import ActiveQuiz from "../ActiveQuiz/ActiveQuiz";
import classes from "./Quiz.module.css";

export default class Quiz extends Component {
  state = {
    activeQuestion: 0,

    quiz: [
      {
        question: "Какого цвета небо?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: "Черный", id: 1 },
          { text: "Белый", id: 2 },
          { text: "Желтый", id: 3 },
          { text: "Зеленый", id: 4 },
        ],
      },
      {
        question: "Год основания Екатеринбурга",
        rightAnswerId: 4,
        id: 2,
        answers: [
          { text: "1234", id: 1 },
          { text: "1455", id: 2 },
          { text: "1988", id: 3 },
          { text: "1723", id: 4 },
        ],
      },
    ],
  };
  onAnswerClickHandler = (answerId) => {
    this.setState({
      activeQuestion: this.state.activeQuestion + 1,
    });
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
          />
        </div>
      </div>
    );
  }
}
