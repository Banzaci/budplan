import React from 'react';
import styled from 'styled-components';

export default function InformationBlock({ header, text, index }) {
  return (
    <Container
      {...(index === 0 && { style: { marginBottom: 20 } } )}
    >
      <Header>
        { header }
      </Header>
      <Paragraph>
        { text }
      </Paragraph>
    </Container>
  );
}

// borderBottomColor: #eee;
// borderBottomWidth: 2;

const Container = styled.View`
  flex-direction: column;
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