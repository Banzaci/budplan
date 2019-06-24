import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import InputDayBalance from '../modules/InputDayBalance';
import { saveAmount, getThisMonth } from '../redux/actions/spendning';

class Wrapper extends Component {

  state = {
    currentMonth: {}
  }

  componentDidMount(){
    const { currentMonth, currentDay } = this.props.dispatch(getThisMonth())
    this.setState({
      currentMonth,
      currentDay
    })
  }
 
  onAmountSet = amount => {
    this.props.save( amount )
  };

  renderMonthlySpending = () => {
    const { currentMonth, currentDay } = this.state;
    const days = Object.keys(currentMonth).sort();
    return days.map( (day, index) => <View key={ index }>
      <InputDayBalance
        currentDay={ currentDay }
        day={ day.toString() }
        balance={ currentMonth[day].amountSpent.toString() }
      />
    </View> )
  }

  render() {
    return (
      <Container>
        <View>+/- +200kr</View>
        <View>Average day spending: 120kr</View>
        <View>Spent so far: 2000kr</View>
        <View>Money to goal: 23.500kr</View>
        <ScrollView>
          { this.renderMonthlySpending() }
        </ScrollView>
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  height: 100%;
  width: 100%;
  padding: 20px 0;
`;

const mapStateToProps = ({ reducers }) => {
  const { spendning } = reducers
  return {
    amount: spendning.amount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    save: (amount) => {
      dispatch(saveAmount(amount))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)