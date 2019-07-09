import React from 'react';
import { Container, Header, Paragraph } from './information-block-style'

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
  )
}