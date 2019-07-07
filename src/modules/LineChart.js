import React, { useState } from 'react';
import { Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styled from 'styled-components';

const screenWidth = Dimensions.get('window').width

export default function Chart({ data }) {

  const days = data.map(([day, _]) => day);
  const amount = data.map(([_, amount]) => amount);

  const chartData = {
    labels: [ ...days ],
    datasets: [{
      data: [ ...amount ],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2
    }]
  }

  return (
    <Container>
      <Text>Denna vecka</Text>
      <LineChart
        data={ chartData }
        width={ screenWidth }
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
`;