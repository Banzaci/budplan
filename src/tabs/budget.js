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
    const { data } = await this.props.dispatch(getFixedData());
    this.setState({
      monthlyBudget,
      monthlyFixed: data
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
        console.log('result', result)
      });
  }

  render() {
    const { fixed } = this.props;
    return (
      <Container>
        <Header>Månadsbudget</Header>
        <Row>
          <TextView>
            <Input
              keyboardType='numeric'
              border
              placeholder="Månadsbudget"
              id="monthlyBudget"
              value={ this.state.monthlyBudget }
              onChange={ this.onChange }
            />
          </TextView>
          <ButtonView>
            <Button
              container={
                {
                  marginBottom: 6,
                  marginLeft: 6,
                  marginRight: 6,
                }
              }
              text={
                {
                  textAlign: 'center',
                }
              }
              style={
                {
                  paddingTop: 12,
                  paddingBottom: 12,
                  paddingLeft: 12,
                  paddingRight: 12,
                  backgroundColor: '#eee',
                }
              }
              title="+"
              onPress={ this.onPress }
            />
          </ButtonView>
        </Row>
        <Expenses
          title="Fasta kostnader"
          typeOfCost="fixed"
          keyNames={ this.state.monthlyFixed }
          amountSpent={ 0 }
          expenses={ fixed }
          onAmountChange={ this.onFixedPress }
        />
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  flex-direction: column;
  margin: 12px;
`;

export const Row = styled.View`
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0;
  text-align: center;
`;

export const TextView = styled.View`
  flex: 2;
`;

export const ButtonView = styled.View`
flex: 1;
`;

const mapStateToProps = ({ reducers }) => {
  const { target, categories } = reducers;
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