import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import styled from 'styled-components';
import Information from '../modules/Information';
import LineChart from '../modules/LineChart';
import PieChart from '../modules/PieChart';
import Expenses from '../modules/Expenses';
import { saveAmount, getThisMonthAmount } from '../redux/actions/spendning';

class Home extends Component {

  state = {
    total: 0,
    average: 0,
    expenses: [],
    weekDays: [],
    weekNumber: '0',
    currentDayAmount: '0',
    spendingByCategories: {},
    currentDay: {},
  }

  async componentDidMount() {
    const { data } = await this.props.dispatch(getThisMonthAmount());
    this.setState({ ...data });
  }

  onAmountChange = ({ typeOfCost, amount, id, day }) => {
    const { currentYear, currentMonth } = this.state;
    this.props
      .save({ currentYear, currentMonth, typeOfCost, amount, id, day })
      .then(({ data }) => {
        this.setState({ ...data });
      });
  };


  render() {
    const { spendingByCategories, total, average, weekDays, weekNumber, currentDay, currentDayDate, currentDayAmount } = this.state;
    return (
      <ScrollView>
        <Container>
          <Expenses
            typeOfCost="variable"
            title={ `${currentDayDate} / ${currentDay.amountSpent}kr` }
            keyNames={ currentDay.variables }
            date={ currentDayDate }
            expenses={ this.props.variable }
            onAmountChange={ this.onAmountChange }
          />
          <LineChart data={ weekDays } weekNumber={ weekNumber }/>
          <Information
            list={[
              {
                header:"Genomsnitt per day",
                text: average,
              },
              {
                header:"Målättning per day",
                text: this.props.targetAverage,
              }
            ]}
          />
          <Information
            list={[
              {
                header:"Spenderat hittills",
                text: total,
              },
              {
                header:"Om samma takt som nu",
                text: this.state.totalByAverage
              }
            ]}
          />
          <PieChart data={ spendingByCategories } expenses={ this.props.variable } />
        </Container>
      </ScrollView>
    );
  }
}

const Container = styled.SafeAreaView`
  margin: 12px;
  height: 100%;
`;

const mapStateToProps = ({ reducers }) => {
  const { target, categories } = reducers;
  return {
    targetAverage: target.targetAverage,
    variable: categories.variable,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    save: data => {
      return dispatch(saveAmount(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
