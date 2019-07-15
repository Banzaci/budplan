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
    spendingByCategories: {}
  }

  async componentDidMount() {
    const { month } = await this.props.dispatch(getThisMonthAmount());
    this.setState({ ...month });
  }

  onAmountChange = ({ typeOfCost, amount, id, day }) => {
    const { currentYear, currentMonth } = this.state;
    this.props
      .save({ currentYear, currentMonth, typeOfCost, amount, id, day })
      .then(({ month }) => this.setState({...month}));
  };


  render() {
    const { spendingByCategories, total, average, weekDays, weekNumber, currentDay, currentDayDate, currentDayAmount } = this.state;
    return (
      <ScrollView>
        <Container>
          <Expenses
            typeOfCost="variable"
            day={ currentDay }
            date={ currentDayDate }
            expenses={ this.props.expenses }
            onAmountChange={ this.onAmountChange }
            value={ currentDayAmount }
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
          <PieChart data={ spendingByCategories } expenses={ this.props.expenses } />
        </Container>
      </ScrollView>
    );
  }
}

const Container = styled.SafeAreaView`
  margin-top: 6px;
  height: 100%;
  width: 100%;
`;

const mapStateToProps = ({ reducers }) => {
  const { target, categories } = reducers;
  return {
    targetAverage: target.targetAverage,
    expenses: categories.categories.variable,
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
