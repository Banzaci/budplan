import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import Expenses from '../modules/Expenses';
import InputButton from '../components/Input-button';

import { saveTargetData, getTargetData } from '../redux/actions/target';

class Budget extends Component {

  state = {
    monthlyBudget: 0
  }

  async componentDidMount(){
    const { data } = await this.props.dispatch(getTargetData());
    this.setState({
      ...data
    });
  }

  onPress = () => {
    const { amount, id } = this.state;
    this.props.save({ amount, id })
      .then(({ monthlyBudget }) => {
        this.setState({
          monthlyBudget
        });
      });
  }

  onAmountChange = ({ typeOfCost, amount, id }) => {
    const { currentMonthDate, currentYearDate } = this.state;
    this.props
      .save({ currentYear, currentMonth, typeOfCost, amount, id, day })
      .then(({ data }) => {
        this.setState({ ...data });
      });
  };

  render() {
    const { fixed } = this.props;
    return (
      <Container>
        <Header>Månadsbudget</Header>
        <InputButton
          onPress={ this.onPress }
          placeholder={ `${this.state.monthlyBudget}kr`}
          keyboardType="numeric"
          id="fixed"
          backgroundColor="#eee"
          shadow
        />
        <Expenses
          typeOfCost="fixed"
          title={ `Lägg till fasta kostnader` }
          expenses={ this.props.fixed }
          onAmountChange={ this.onAmountChange }
        />
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  flex-direction: column;
  margin: 12px;
`;

export const Row = styled.View`
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0;
  text-align: center;
`;

export const TextView = styled.View`
  flex: 2;
`;

export const ButtonView = styled.View`
flex: 1;
`;

const mapStateToProps = ({ reducers }) => {
  const { target, categories } = reducers;
  return {
    monthlyBudget: target.monthlyBudget,
    fixed: categories.fixed,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    save: data => {
      return dispatch(saveTargetData(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget)