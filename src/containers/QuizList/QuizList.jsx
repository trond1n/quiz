import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/Loader/Loader";
import classes from "./QuizList.module.css";

export default class QuizList extends Component {
  state = { quizes: [], loading: true };
  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    // axios.get('https://quizwhoizz-default-rtdb.firebaseio.com/quiz.json').then(response=>{
    //   console.log(response)
    // })

    try {
      const response = await axios.get("/quizes.json");
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({ id: key, name: `Test #${index + 1}` });
      });

      this.setState({
        quizes,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}
