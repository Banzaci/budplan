import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import InputDayBalance from '../modules/InputDayBalance';
import Information from '../modules/Information';
import LastMonthSpending from '../modules/LastMonthSpending';
import { saveAmount, getThisMonthAmount } from '../redux/actions/spendning';

class Home extends Component {

  state = {
    monthWithAmount: {},
    totalAmountSpent: 0,
    averageAmountSpent: 0,
    lastMonthSpending: 0,
  }

  async componentDidMount(){
    const props = await this.props.dispatch(getThisMonthAmount())
    this.setState({
      ...props
    })
  }
 
  onAmountChange = ({ day, amount }) => {
    const { currentYear, currentMonth } = this.state;
    this.props.save({ currentYear, currentMonth, day, amount })
      .then( ({ totalAmountSpent, averageAmountSpent }) => {
        this.setState({
          totalAmountSpent,
          averageAmountSpent
        })
      })
  };

  printAmount = (monthWithAmount, day) => {
    const amount = monthWithAmount[day].amountSpent.toString()
    return amount;
  }

  renderMonthlySpending = () => {
    const { monthWithAmount, currentDay } = this.state;
    const days = Object.keys(monthWithAmount).sort();
    return days.map( (day, index) => <View key={ index }>
      <InputDayBalance
        averageAmountSpent={ this.state.averageAmountSpent }
        onAmountChange={ this.onAmountChange }
        currentDay={ currentDay }
        day={ day.toString() }
        amount={ this.printAmount(monthWithAmount, day) }
      />
    </View> )
  }

  render() {
    return (
      <Container>
        <Information
          totalAmountSpent={ this.state.totalAmountSpent }
          averageAmountSpent={ this.state.averageAmountSpent }
        />
        <LastMonthSpending
          lastMonthSpending={ this.state.lastMonthSpending }
        />
        <Scroll>
          <ScrollView>
            { this.renderMonthlySpending() }
          </ScrollView>
        </Scroll>
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  margin-top: 6px;
  height: 100%;
  width: 100%;
`;

const Scroll = styled.View`
  margin-top: 6px;
`;

const mapStateToProps = ({ reducers }) => {
  const { spendning, target } = reducers;

  return {
    maxMonthlyExpense: target.maxMonthlyExpense,
    amount: spendning.amount
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