import React, { Component } from "react";
import axios from "../../axios/axios-quiz";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {
  createControl,
  validate,
  validateForm,
} from "../../form/formFramework";
import classes from "./QuizCreator.module.css";

function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: "Введите вариант ответа",
    id: number,
  });
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым",
      },
      { required: true }
    ),
    option1: createControl(createOptionControl(1), { required: true }),
    option2: createControl(createOptionControl(2), { required: true }),
    option3: createControl(createOptionControl(3), { required: true }),
    option4: createControl(createOptionControl(4), { required: true }),
  };
}
export default class QuizCreator extends Component {
  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };

  submitHandler = (e) => {
    e.preventDefault();
  };
  addQuestionHandler = (e) => {
    e.preventDefault();

    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {
          text: option1.value,
          id: option1.id,
        },
        {
          text: option2.value,
          id: option2.id,
        },
        {
          text: option3.value,
          id: option3.id,
        },
        {
          text: option4.value,
          id: option4.id,
        },
      ],
    };
    quiz.push(questionItem);
    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };
  createQuizHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "quizes.json",
        this.state.quiz
      );

      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
      });
    } catch (e) {
      console.log(e);
    }
  };
  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;
    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };
  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </>
      );
    });
  }
  selectChangeHandler = (e) => {
    this.setState({
      rightAnswerId: +e.target.value,
    });
  };
  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            {select}
            <Button
              type="primary"
              disabled={!this.state.isFormValid}
              onClick={this.addQuestionHandler}
            >
              Добавить вопрос
            </Button>
            <Button
              type="success"
              disabled={this.state.quiz.length === 0}
              onClick={this.createQuizHandler}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
