import React from "react";
import classes from "./ActiveQuiz.module.css";

const ActiveQuiz = (props) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>1. </strong>
          Какой сейчас год?
        </span>

        <small>4 из 12</small>
      </p>
      <ul>
        <li>1950</li>
        <li>2465</li>
        <li>2021</li>
        <li>1265</li>
      </ul>
    </div>
  );
};
export default ActiveQuiz;
