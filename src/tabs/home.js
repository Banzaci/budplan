import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Information from '../modules/Information';
import LineChart from '../modules/LineChart';
import Expenses from '../modules/Expenses';
import { getThisMonthAmount } from '../redux/actions/spendning';

class Home extends Component {

  state = {
    total: 0,
    average: 0,
    expenses: [],
    week: [],
    weekNumber: '0'
  }

  async componentDidMount() {
    const props = await this.props.dispatch(getThisMonthAmount());
    this.setState({
      ...props
    });
  }

  onAmountChange = ({ day, amount, category }) => {
    const { currentYear, currentMonth, type, category } = this.state;
    this.props
      .save({ currentYear, currentMonth, day, amount, type, category })
      .then(({ total, average, week, weekNumber }) => {
        this.setState({
          total,
          average,
          week,
          weekNumber
        });
      });
  };


  render() {
    const { total, average, week, weekNumber, currentDay } = this.state;
    return (
      <Container>
        <Expenses
          type="variable"
          day={ currentDay }
          expenses={ this.state.expenses }
        />
        <LineChart data={ week } weekNumber={ weekNumber }/>
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

const mapStateToProps = ({ reducers }) => {
  const { spendning, target, category } = reducers;
  const { categories } = category;
  return {
    totalByAverage: spendning.totalByAverage,
    targetAverage: target.average,
    expenses: categories.variable,
  }
}

export default connect(mapStateToProps)(Home)