import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';

export default function Label(props) {
  const { btnId, disabled, backgroundColor, keyboardType, shadow, placeholder, id, onChange, onPress, style={} } = props;
  return (
    <Container
      style={ style }
    >
      <TextView>
        <Input
          keyboardType={ keyboardType }
          shadow={ shadow }
          placeholder={ placeholder }
          id={ id }
          onChange={ onChange }
        />
      </TextView>
      <ButtonView>
        <Button
          disabled={ disabled }
          containerStyle={
            {
              marginLeft: 12,
            }
          }
          textStyle={
            {
              textAlign: 'center',
            }
          }
          style={
            {
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 12,
              paddingRight: 12,
              backgroundColor,
            }
          }
          title="+"
          onPress={ onPress }
        />
      </ButtonView>
    </Container>
  )
}

const Container = styled.View`
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const TextView = styled.View`
  flex: 2;
`;

const ButtonView = styled.View`
  flex: 1;
`;