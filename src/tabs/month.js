
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
    const { month } = await this.props.dispatch(getThisMonthAmount());
    const { days } = month;
    this.setState({
      days,
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

  printAmount = ({ amountSpent }) => {
    if (!amountSpent) return 0;
    return amountSpent;
  };

  renderMonthlySpending = () => {
    const { days, currentDay } = this.state;
    const sortedDays = Object.keys(days).sort();
    return sortedDays.map((date, index) => {
      const value = this.printAmount(days[date]);
      return (<View key={ index }>
        <Expenses
            typeOfCost="variable"
            day={ days[date] }
            date={ date }
            expenses={ this.props.expenses }
            onAmountChange={ this.onAmountChange }
            value={ value }
          />
      </View> )});
  }
  render() {
    return (
      <Container>
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

const mapStateToProps = ({ reducers }) => {
  const { category } = reducers;
  return {
    expenses: category.categories,
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