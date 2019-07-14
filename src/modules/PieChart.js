import React, { useState } from 'react';
import { Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import styled from 'styled-components';
import randomColor from 'randomcolor';

const screenWidth = Dimensions.get('window').width

export default function Chart({ data, expenses }) {

  const exps = Object.keys(data);

  const colors = randomColor({
    count: exps.length,
    hue: 'green'
  });

  const list = exps.map((v, index) => ({
      name: expenses[v],
      expense: data[v],
      color: colors[index],
      legendFontColor: '#7F7F7F',
  }))

  // const list = [
  //   { name: 'Mat', expense: 6500, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  //   { name: 'Kläder', expense: 2000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  //   { name: 'Bensin', expense: 2500, color: '#eee', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  //   { name: 'Fasta utgifter', expense: 12500, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  // ]

  return (
    <Container>
      <PieChart
        data={list}
        width={ screenWidth - 24 }
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="expense"
        backgroundColor="transparent"
      />
    </Container>

  );
}

const Container = styled.View`
width: 100%;
  margin: 12px;
  justify-content: center;

`;