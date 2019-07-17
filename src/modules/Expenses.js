import React, { Component } from 'react';
import InputButton from '../components/Input-button';
import Button from '../components/Button';
import { boxShadow } from '../style/common';
import styled from 'styled-components';

export default class Expenses extends Component {

  state = {
    isOpen: false,
  };

  onToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  getKeyName = (keyName, name) => (keyName) ? `${name} / ${keyName}kr` : name;

  renderList = (expense, index) =>  {
    const [ id, name ] = expense;
    const { keyNames, border } = this.props;
    const keyName = this.getKeyName(keyNames[id], name);// ERROR

    return (<InputButton
      key={ index }
      onPress={ this.onChange }
      placeholder={ keyName }
      keyboardType="numeric"
      id={ id }
      backgroundColor="#eee"
      shadow
    />)
  }

  onChange = ({ amount, id }) => {
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

const Container = styled.View`
  margin-bottom: 6px;
`;