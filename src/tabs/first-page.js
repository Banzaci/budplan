import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import InputDayBalance from '../modules/InputDayBalance';
import Information from '../modules/Information';
import Goal from '../modules/Goal';
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

  onClick = (action) => {
    console.log(action)
  }

  render() {
    return (
      <Container>
        <Information onClick={ this.onClick } />
        <Goal />
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