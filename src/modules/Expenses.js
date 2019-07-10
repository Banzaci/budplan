import React, { Component } from "react";
import Category from "../components/Category";
import Button from "../components/Button";
import { Container } from './expenses-style';

export default class Expenses extends Component {
  state = {
    isOpen: true,
  };

  onToggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  };

  renderList = (expense, index) =>  {
    const [id, name] = Object.entries(expense)[0];
    return (<Category
      onClick={ this.onAmountChange }
      key={ index }
      id={ id }
      name={ name }
      />
    )
  }

  onAmountChange = ({ amount, id }) => {
    const { typeOfCost, day } = this.props;
    this.props.onAmountChange({ typeOfCost, amount, id, day })
  };

  render() {
    const { isOpen } = this.state;
    const icon = isOpen ? 'add' : 'delete';
    const title = isOpen ? 'Stäng' : 'Öppna';
    const expenses = this.props.expenses.map(this.renderList);
    return (
      <Container>
        <Button title={ title } type={ icon } onPress={ this.onToggle } />
        { isOpen &&  expenses }
      </Container>
    );
  }
}
