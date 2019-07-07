import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styled from 'styled-components';

const screenWidth = Dimensions.get('window').width - 20;

export default function Chart({ data, weekNumber }) {

  const days = data.map(([day, _]) => day);
  const amount = data.map(([_, amount]) => amount);

  const chartData = {
    labels: [ ...days ],
    datasets: [{
      data: [ ...amount ],
      color: (opacity = 1) => `rgba(255, 255, 255, .6)`,
      strokeWidth: 2
    }]
  }

  return (
    <Container>
      <Week>{ `Vecka nr ${weekNumber}` }</Week>
      <LineChart
        data={ chartData }
        width={ screenWidth }
        height={220}
        chartConfig={{
          backgroundColor: '#eee',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, .5)`,
          style: {
            borderRadius: 16
          }
        }}
      />
    </Container>

  );
}

const Container = styled.View`
  margin-bottom: 6px;
  margin: 0 10px;
`;

const Week = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0 5px;
`;