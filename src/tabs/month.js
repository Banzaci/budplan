
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Expenses from '../modules/Expenses';
import { saveAmount, getThisMonthAmount } from '../redux/actions/spendning';

class Home extends Component {

  state = {
    days: {}
  }

  async componentDidMount(){
    const { data } = await this.props.dispatch(getThisMonthAmount());
    this.setState({
      ...data,
    })
  }
 
  onAmountChange = ({ day, amount, id, typeOfCost }) => {
    const { currentYear, currentMonth } = this.state;
    this.props.save({ currentYear, currentMonth, day, amount, id, typeOfCost })
      .then( ({ total, average }) => {
        this.setState({
          total,
          average
        })
      })
  };

  renderMonthlySpending = () => {
    const { days } = this.state;
    const sortedDays = Object.keys(days).sort();
    return sortedDays.map((date, index) => {
      const currentDay = days[date];
      const { amountSpent, variables } = currentDay;
      const output = `${date} / ${amountSpent}kr`;
      return (<View key={ index }>
        <Expenses
          style={ { marginBottom: 1, marginLeft: 12, marginRight: 12 } }
          typeOfCost="variable"
          amountSpent={ output }// Title name?
          keyNames={ variables }
          date={ date }
          expenses={ this.props.expenses.variable }
          onAmountChange={ this.onAmountChange }
        />
      </View> )});
  }
  render() {
    return (
      <Container>
        <Header>Dagliga månadskostnader</Header>
        <ScrollView>
          { this.renderMonthlySpending() }
        </ScrollView>
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  margin-top: 6px;
  height: 100%;
  width: 100%;
`;

export const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0;
  text-align: center;
`;

const mapStateToProps = ({ reducers }) => {
  const { categories } = reducers;
  return {
    expenses: categories.categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    save: (data) => {
      return dispatch(saveAmount(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)