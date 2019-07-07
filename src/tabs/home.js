import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import TodayInput from '../components/TodayInput';
import Information from '../modules/Information';
import { saveAmount, getThisMonthAmount } from '../redux/actions/spendning';
import LineChart from '../modules/LineChart';
import PieChart from '../modules/PieChart';

class Home extends Component {

  state = {
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
 
  onAmountChange = ({ currentDay, amount }) => {
    const { currentYear, currentMonth } = this.state;
    this.props.save({ currentYear, currentMonth, day: currentDay, amount })
      .then( ({ total, average, week, weekNumber }) => {
        this.setState({
          total,
          average,
          week,
          weekNumber
        })
      })
  };

  renderToday = todayAmount => {
    const { average, currentDay } = this.state;
    return (
      <TodayInput
        onChange={ this.onAmountChange }
        value={ todayAmount }
        currentDay={ currentDay }
      />
    )
  }
  render() {
    const { total, average, lastMonthSpending, todayAmount, week, weekNumber } = this.state;
    return (
      <Container>
        <Today>
          { todayAmount && this.renderToday(todayAmount) }
        </Today>
        { week && <LineChart data={ week } weekNumber={ weekNumber }/> }
        <Information
          list={[
            {
              header:"Genomsnitt per day",
              text: average,
            },
            {
              header:"Målättning per day",
              text: this.props.targetAverage,
            },
            {
              header:"Spenderat hittills",
              text: total,
            },
            {
              header:"Om samma takt som nu",
              text: this.props.totalByAverage
            }
          ]}
        />
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  margin-top: 6px;
  height: 100%;
  width: 100%;
`;

const Today = styled.View`
  padding: 20px 0;
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