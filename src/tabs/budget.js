import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import Expenses from '../modules/Expenses';
import { saveTargetData, getTargetData } from '../redux/actions/target';
import { saveFixedData, getFixedData } from '../redux/actions/fixed';

class Budget extends Component {

  state = {
    monthlyBudget: 0
  }

  async componentDidMount(){
    const { monthlyBudget } = await this.props.dispatch(getTargetData());
    this.setState({
      monthlyBudget
    });
  }

  onPress = () => {
    const { amount, id } = this.state;
    this.props.save({ amount, id })
      .then(({ monthlyBudget }) => {
        this.setState({
          monthlyBudget
        });
      });
  }

  onChange = (amount) => {
    this.setState({
      ...amount
    });
  }

  onFixedPress = ({ amount, id, typeOfCost }) => {
    this.props.saveFixed({ amount, id, typeOfCost })
      .then((result) => {
        console.log(result)
      });
  }

  render() {
    const { fixed } = this.props;
    return (
      <Container>
        <Row>
          <Header>Månadsbudget</Header>
          <TextView>
            <Input
              keyboardType='numeric'
              border
              placeholder="Månadsbudget"
              labelLeft="Månads budget"
              id="monthlyBudget"
              value={ this.state.monthlyBudget }
              onChange={ this.onChange }
            />
            <Button
              title="+"
              type="add"
              onPress={ this.onPress }
            />
          </TextView>
        </Row>
        <Row>
          <Expenses
            title="Fasta kostnader"
            typeOfCost="fixed"
            expenses={ fixed }
            onAmountChange={ this.onFixedPress }
          />
        </Row>
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  flex-direction: column;
  margin: 12px;
`;

export const TextView = styled.View`
  flex-direction: row;
`;

export const Row = styled.View`
  flex-direction: column;
  margin-bottom: 20px;
`;
export const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0;
  text-align: center;
`;

const mapStateToProps = ({ reducers }) => {
  const { target, categories, fixed } = reducers;
  // console.log(fixed)
  return {
    fixed: categories.categories.fixed,
    monthlyBudget: target.monthlyBudget
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    save: data => {
      return dispatch(saveTargetData(data))
    },
    saveFixed: data => {
      return dispatch(saveFixedData(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget)