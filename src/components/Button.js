import React from 'react';
import { Text } from 'react-native';
import { Container, Label, ActionButton } from './button-style';

export default function Button({ title, onPress, text }) {
  return (
    <Container>
      <ActionButton
         onPress={ onPress }
       >
         <Text>
           { title }
         </Text>
       </ActionButton>
      <Label>
        { text }
      </Label>
    </Container>
  )
}
// style={styles.button}
//https://facebook.github.io/react-native/docs/button.html

// https://facebook.github.io/react-native/docs/touchableopacity

