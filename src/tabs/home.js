import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Information from '../modules/Information';
import LineChart from '../modules/LineChart';
import Toggle from '../modules/Toggle';

class Home extends Component {

  state = {
    total: 0,
    average: 0,
  }

  render() {
    const { total, average, week, weekNumber } = this.state;
    return (
      <Container>
        <Toggle />
        { week && <LineChart data={ week } weekNumber={ weekNumber }/> }
        <Information
          list={[
            {
              header:"Genomsnitt per day",
              text: average,
            },
            {
              header:"Målättning per day",
              text: this.props.targetAverage,
            }
          ]}
        />
        <Information
          list={[
            {
              header:"Spenderat hittills",
              text: total,
            },
            {
              header:"Om samma takt som nu",
              text: this.props.totalByAverage
            }
          ]}
        />
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  margin-top: 6px;
  height: 100%;
  width: 100%;
`;

const mapStateToProps = ({ reducers }) => {
  const { spendning, target } = reducers;
  return {
    totalByAverage: spendning.totalByAverage,
    targetAverage: target.average,
  }
}

export default connect(mapStateToProps)(Home)