import React, { useState } from 'react';
import { Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import styled from 'styled-components';

const screenWidth = Dimensions.get('window').width

export default function Chart({ list }) {

  const data = [
    { name: 'Mat', expense: 6500, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Kläder', expense: 2000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Bensin', expense: 2500, color: '#eee', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Fasta utgifter', expense: 12500, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ]

  return (
    <Container>
      <Text>Denna vecka</Text>
      <PieChart
        data={data}
        width={screenWidth}
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
        accessor="expense"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </Container>

  );
}

const Container = styled.View`
  margin-bottom: 6px;
`;