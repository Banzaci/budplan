import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/Input'
import { saveTargetData, getTargetData } from '../redux/actions/target';

class Profile extends Component {

  state = {
    monthlyBudget: 0
  }

  async componentDidMount(){
    const props = await this.props.dispatch(getTargetData());
    this.setState({
      monthlyBudget: props.data.monthlyBudget
    });
  }

  onChange = ({ amount, id }) => {
    this.props.save({ amount, id })
      .then(props => {
        this.setState({
          monthlyBudget: props.data.monthlyBudget
        });
      });
  }

  render() {
    return (
      <Container>
        <Input
          id="monthlyBudget"
          label="Monthly budget"
          value={ this.state.monthlyBudget }
          keyboardType='numeric'
          onChange={ this.onChange }
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)