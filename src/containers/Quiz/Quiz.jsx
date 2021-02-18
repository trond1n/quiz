import React, { Component } from "react";
import ActiveQuiz from "../ActiveQuiz/ActiveQuiz";
import classes from "./Quiz.module.css";

export default class Quiz extends Component {
  state = {
    quiz: [
      {
        question: "Какого цвета небо?",
        rightAnswerId: 2,
        answers: [
          { text: "Черный", id: 1 },
          { text: "Белый", id: 2 },
          { text: "Желтый", id: 3 },
          { text: "Зеленый", id: 4 },
        ],
      },
    ],
  };
  onAnswerClickHandler = (answerId) => {
    console.log(answerId);
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
            answers={this.state.quiz[0].answers}
            question={this.state.quiz[0].question}
            onAnswerClick={this.onAnswerClickHandler}
          />
        </div>
      </div>
    );
  }
}
