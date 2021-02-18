import React, { Component } from "react";
import ActiveQuiz from "../ActiveQuiz/ActiveQuiz";
import classes from "./Quiz.module.css";

export default class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null,

    quiz: [
      {
        question: "Какого цвета небо?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: "Черный", id: 1 },
          { text: "Синий", id: 2 },
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
    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswerId === answerId) {
      this.setState({ answerState: { [answerId]: "success" } });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          console.log("finished");
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      this.setState({ answerState: { [answerId]: "error" } });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }
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
            state={this.state.answerState}
          />
        </div>
      </div>
    );
  }
}
