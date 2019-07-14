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
    luminosity: 'dark',
    format: 'rgba'
  });

  const list = exps.map((v, index) => ({
    name: expenses[v],
    expense: data[v],
    color: colors[index],
    legendFontColor: '#7F7F7F',
  }))

  return (
    <Container>
      <PieChart
        data={list}
        width={ screenWidth - 24 }
        height={ 220 }
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="expense"
        backgroundColor="#eee"
        style={ {} }
        absolute
      />
    </Container>

  );
}

const Container = styled.View`
  margin: 12px;
  justify-content: center;

`;