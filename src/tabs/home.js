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
    total: 0,
    average: 0,
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
      .then( ({ total, average }) => {
        this.setState({
          total,
          average
        })
      })
  };

  printAmount = (monthWithAmount, day) => monthWithAmount[day].amountSpent.toString();

  renderMonthlySpending = () => {
    const { monthWithAmount, currentDay } = this.state;
    const days = Object.keys(monthWithAmount).sort();
    return days.map( (day, index) => <View key={ index }>
      <InputDayBalance
        average={ this.state.average }
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
          total={ this.state.total }
          average={ this.state.average }
          targetAverage={ this.props.targetAverage }
          totalByAverage={ this.props.totalByAverage }
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
    totalByAverage: spendning.totalByAverage,
    targetAverage: target.average,
    monthlyBudget: target.monthlyBudget,
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