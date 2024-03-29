
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
    const { data } = await this.props.dispatch(getThisMonthAmount());
    this.setState({
      ...data,
    })
  }
 
  onAmountChange = ({ day, amount, id, typeOfCost }) => {
    const { currentYear, currentMonth } = this.state;
    this.props.save({ currentYear, currentMonth, day, amount, id, typeOfCost })
      .then( ({ data }) => {
        this.setState({
          ...data,
        })
      })
  };

  renderMonthlySpending = () => {
    const { days } = this.state;
    const sortedDays = Object.keys(days).sort();
    return sortedDays.map((date, index) => {
      const currentDay = days[date];
      const { amountSpent, variables } = currentDay;
      const output = `${date} / ${amountSpent}kr`;
      return (<View key={ index } style={ { marginLeft: 12, marginRight: 12 } }>
        <Expenses
          style={ { marginBottom: 1, marginLeft: 12, marginRight: 12 } }
          typeOfCost="variable"
          title={ output }
          keyNames={ variables }
          date={ date }
          expenses={ this.props.categories.variable }
          onAmountChange={ this.onAmountChange }
        />
      </View> )});
  }
  render() {
    return (
      <Container>
        <Header>Dagliga månadskostnader</Header>
        <ScrollView>
          { this.renderMonthlySpending() }
        </ScrollView>
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  height: 100%;
  padding: 12px;
`;

export const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0;
  text-align: center;
`;

const mapStateToProps = ({ reducers }) => {
  const { categories } = reducers;
  return {
    categories,
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