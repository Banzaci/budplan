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

  forwardRef = () => React.forwardRef((props, ref) => {
    return <InputDayBalance
    {...props} forwardedRef={ ref } />;
  });
  
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

  setScrollViewRef = element => {}

  render() {
    return (
      <Container>
        <ScrollView
          ref={ this.state.ref }
        >
          { this.renderMonthlySpending() }
        </ScrollView>
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  height: 100%;
  width: 100%;
  padding-top: 20px;
  background-color: papayawhip;
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