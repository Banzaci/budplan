import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import InputDayBalance from './modules/InputDayBalance';
import { saveAmount } from './redux/actions/yesterday';

class Wrapper extends Component {
  
  state = {
    amount: 0
  }
  onAmountSet = amount => {
    // this.setState({ amount })
    this.props.save( amount )
  };

  render() {
    console.log('props', this.props)
    return (
      <Container>
        <View><Text>{ this.props.amount }</Text></View>
        <InputDayBalance
          onAmountSet={ this.onAmountSet }
        />
      </Container>
    );
  }
}

const Container = styled.View`
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: papayawhip;
`;

const mapStateToProps = ({ reducers }) => {
  const { yesterday } = reducers
  console.log('yesterday', yesterday)
  return {
    amount: yesterday.amount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: (amount) => {
      dispatch(saveAmount(amount))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)