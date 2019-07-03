import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

class Loader extends Component {

  state = {}

  render() {
    return (
      <Container></Container>
    );
  }
}

const Container = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  background: black;
  padding: 0;
  margin: 0;
`;

const mapStateToProps = ({ reducers }) => {
  const { profile } = reducers
  return {
    target: profile.target
  }
}


export default connect(mapStateToProps)(Loader)