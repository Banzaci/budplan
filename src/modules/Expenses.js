import React, { Component } from 'react';
import Category from '../components/Category';
import Button from '../components/Button';
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

  getPlaceHolderText = (day, id, name) => (day && day.variables && day.variables[id]) ? `${name} / ${day.variables[id]}kr` : name;

  renderList = (expense, index) =>  {
    const [id, name] = expense;
    const { day, border } = this.props;
    return (<Category
      border={ border }
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
    const { title, style } = this.props;
    const icon = isOpen ? 'add' : 'delete';
    const expenses = Object.entries(this.props.expenses).map(this.renderList);
    return (
      <Container>
        <Button
          style={ {
            ...boxShadow, 
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 12,
            paddingRight: 12,
            backgroundColor: '#FFF',
            ...style,
          } }
          title={ `${title}` }
          icon={ icon }
          onPress={ this.onToggle }
        />
        { isOpen &&  expenses }
      </Container>
    );
  }
}
