import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../components/Input'

class Profile extends Component {

  state = {
    averageDayTarget: 0,
  }

  async componentDidMount(){}

  onChange = ({ text, key }) => {
    console.log(key, text)
  }

  render() {
    return (
      <Container>
        <Input
          key="averageDayTarget"
          label="Daily target"
          value={ this.state.averageDayTarget }
          onChange={ this.onChange }
        />
        <Input
          key="averageDayTarget"
          label="Daily target"
          value={ this.state.averageDayTarget }
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
  return {
    reducers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    save: data => {
      console.log(data)
      // return dispatch(saveTarget(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)