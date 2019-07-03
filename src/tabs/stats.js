import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

class Statistics extends Component {

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
  return {}
}

export default connect(mapStateToProps, null)(Statistics)