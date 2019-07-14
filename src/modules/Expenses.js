import React, { Component } from "react";
import Category from "../components/Category";
import Button from "../components/Button";
import { Container } from './expenses-style';
import { boxShadow } from '../style/common';

export default class Expenses extends Component {

  state = {
    isOpen: false,
  };

  onToggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  };

  getPlaceHolderText = (day, id, name) => (day && day.variables && day.variables[id]) ? day.variables[id] : name;

  renderList = (expense, index) =>  {
    const [id, name] = Object.entries(expense)[0];
    const { date, day } = this.props;

    return (<Category
      onClick={ this.onAmountChange }
      key={ index }
      id={ id }
      name={ this.getPlaceHolderText(day, id, name) }
      />
    )
  }

  onAmountChange = ({ amount, id }) => {
    const { typeOfCost, date } = this.props;
    this.props.onAmountChange({ typeOfCost, amount, id, day: date })
  };

  render() {
    const { isOpen } = this.state;
    const { day, value, date } = this.props;
    const icon = isOpen ? 'add' : 'delete';
    const title = isOpen ? 'Stäng' : 'Öppna';
    const expenses = this.props.expenses.map(this.renderList);
    return (
      <Container
        style={ boxShadow }
      >
        <Button
          text={ `${date} / ${value}kr` }
          title={ `${title}` }
          type={ icon }
          onPress={ this.onToggle }
        />
        { isOpen &&  expenses }
      </Container>
    );
  }
}
