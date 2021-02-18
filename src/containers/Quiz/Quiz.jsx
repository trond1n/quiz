import React, { Component } from "react";
import ActiveQuiz from "../ActiveQuiz/ActiveQuiz";
import classes from "./Quiz.module.css";

export default class Quiz extends Component {
  state = {
    quiz: [],
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
            <h1>Quiz</h1>
          <ActiveQuiz />
        </div>
      </div>
    );
  }
}
