import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import { saveTargetData, getTargetData } from '../redux/actions/target';

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

  onPress = (e) => {
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

  render() {
    return (
      <Container>
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
      
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  margin: 6px 12px;
  margin-top: 30px;
  flex-direction: column;
`;

export const TextView = styled.View`
  width: 80%;
  flex-direction: row;
`;
export const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  padding: 20px 0;
  text-align: center;
`;

const mapStateToProps = ({ reducers }) => {
  const { target } = reducers;
  return {
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