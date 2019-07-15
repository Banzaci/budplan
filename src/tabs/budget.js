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

  renderFixedCosts = () => {
    const { fixed } = this.props;
    return (<View>
      <Expenses
        typeOfCost="fixed"
        expenses={ fixed }
        onAmountChange={ this.onAmountChange }
      />
    </View> );
  }

  render() {
    
    return (
      <Container>
        <Row>
          <Header>Månadsbudget</Header>
          <TextView>
            <Input
              keyboardType='numeric'
              border
              placeholder="Månads budget"
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
          { this.renderFixedCosts() }
        </Row>
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  margin: 6px 12px;
  margin-top: 30px;
  flex-direction: column;
`;

export const View = styled.View`
flex-direction: row;
`;

export const TextView = styled.View`
  width: 80%;
  flex-direction: row;
`;

export const Row = styled.View`
  flex-direction: column;
`;
export const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  padding: 20px 0;
  text-align: center;
`;

const mapStateToProps = ({ reducers }) => {
  const { target, categories, fixed } = reducers;
  console.log(fixed)
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget)