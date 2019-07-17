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

  getLegazy = (day, id, name) => (day && day.variables && day.variables[id]) ? `${name} / ${day.variables[id]}kr` : name;
  getKeyName = (keyNames, id, name) => (keyNames[id]) ? `${name} / ${keyNames[id]}kr` : name;

  renderList = (expense, index) =>  {
    const [ id, name ] = expense;
    const { keyNames, day, border } = this.props;
    const tempName = keyNames ? this.getKeyName(keyNames, id, name) : this.getLegazy(day, id, name);
    return (<Category
      border={ border }
      onClick={ this.onAmountChange }
      key={ index }
      id={ id }
      name={ tempName }
      />
    )
  }

  onAmountChange = ({ amount, id }) => {
    const { typeOfCost, date } = this.props;
    this.props.onAmountChange({ typeOfCost, amount, id, day: date })
  };

  render() {
    const { isOpen } = this.state;
    const { amountSpent, style } = this.props;
    const icon = isOpen ? 'add' : 'delete';
    const expenses = Object.entries(this.props.expenses).map(this.renderList);
    return (
      <Container>
        <Button
          container={
            {
              marginBottom: 6,
              marginLeft: 6,
              marginRight: 6,
            }
          }
          text={
            {
              textAlign: 'left',
              marginLeft: 20,
            }
          }
          style={
            {
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 12,
              paddingRight: 12,
              backgroundColor: '#FFF',
              ...boxShadow,
              ...style,
            }
          }
          title={ amountSpent }
          icon={ icon }
          onPress={ this.onToggle }
        />
        { isOpen &&  expenses }
      </Container>
    );
  }
}
