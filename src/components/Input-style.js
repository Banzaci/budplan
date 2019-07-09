import styled from 'styled-components';

export const Text = styled.View``;

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100%;
  margin: 0 auto;
  border-radius: 12px;
`;

export const Label = styled.Text`
  font-size: 18px;
  padding: 6px 12px;
`;

export const TextInput = styled.TextInput`
  padding: 6px 12px;
  font-size: 22px;
  width: 60%;
  text-align: center;
`;