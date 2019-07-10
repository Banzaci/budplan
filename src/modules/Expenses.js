import React, { Component } from "react";
import Category from "../components/Category";
import Button from "../components/Button";
import { Container } from './expenses-style';

export default class VariableCost extends Component {
  state = {
    isOpen: true,
  };

  onToggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  };

  renderList = (expense, index) => (
    <Category onClick={ this.onAmountChange } key={index} category={expense} />
  );

  onAmountChange = ({ day, amount, category }) => {
    const { currentYear, currentMonth, type, category } = this.state;
    this.props
      .save({ currentYear, currentMonth, day, amount, type, category })
      .then(({ total, average, week, weekNumber }) => {
        this.setState({
          total,
          average,
          week,
          weekNumber
        });
      });
  };

  render() {
    const { isOpen } = this.state;
    const icon = isOpen ? 'add' : 'delete';
    const title = isOpen ? 'Stäng' : 'Öppna';
    const variable = this.props.expenses.map(this.renderList);
    return (
      <Container>
        <Button title={ title } type={ icon } onPress={ this.onToggle } />
        { isOpen &&  variable }
      </Container>
    );
  }
}
