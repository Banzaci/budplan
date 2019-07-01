import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { saveTarget } from '../redux/actions/profile';

class Profile extends Component {

  state = {}

  async componentDidMount(){}

  render() {
    return (
      <Container>
        
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
  const { profile } = reducers
  return {
    target: profile.target
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    save: (data) => {
      return dispatch(saveTarget(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)