import React from 'react';
import styled from 'styled-components';

export default function InformationBlock({ header, text, style = {} }) {
  return (
    <Container { ...style } >
      <Header>
        { header }
      </Header>
      <Paragraph>
        { text }
      </Paragraph>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  margin: 0 10px;
  padding: 20px 0;
  borderBottomColor: #eee;
  borderBottomWidth: 2;
`;

const Header = styled.Text`
  text-align: left;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 6px;
  padding: 0;
`;

const Paragraph = styled.Text`
  text-align: left;
  font-size: 14px;
  margin: 0;
  padding: 0;
`;