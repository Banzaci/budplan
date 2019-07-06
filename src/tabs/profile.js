import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/Input'
import { saveTargetData, getTargetData } from '../redux/actions/target';

class Profile extends Component {

  state = {
    maxMonthlyExpense: null
  }

  async componentDidMount(){
    const props = await this.props.dispatch(getTargetData());
    this.setState({
      maxMonthlyExpense: props.data.maxMonthlyExpense
    })
  }

  onChange = ({ amount, id }) => {
    this.props.save({ amount, id })
      .then( (data) => {})// Show some feedback
  }

  render() {
    return (
      <Container>
        { this.state.maxMonthlyExpense && <Input
          id="maxMonthlyExpense"
          label="Monthly budget"
          value={ this.state.maxMonthlyExpense }
          keyboardType='numeric'
          onChange={ this.onChange }
        /> }
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  height: 100%;
  width: 100%;
  padding: 20px 0;
`;

const mapStateToProps = ({ reducers }) => {
  const { target } = reducers;
  return {
    maxMonthlyExpense: target.maxMonthlyExpense
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)