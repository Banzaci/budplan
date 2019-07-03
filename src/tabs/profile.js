import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

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