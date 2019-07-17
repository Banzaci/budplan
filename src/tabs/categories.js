import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Label from '../components/Label';
import Button from '../components/Button';
import Input from '../components/Input';
import { saveCategoryData } from '../redux/actions/categories';

class Category extends Component {

  state = {
    fetching: false
  }
  onPress = (e) => {
    const { amount, id } = this.state;
    this.setState({
      fetching: true
    });
    this.props.save({ amount, id })
      .then((props) => {
        this.setState({
          fetching: false
        });
      });
  }

  onChange = (amount) => {
    this.setState({
      ...amount
    });
  }

  onFixedCostPress = () => {}
  onFixedCostChange = () => {}

  renderList = ([_, value], index) => {
    return (
      <Wrapper
        key={ index }
      >
        <Label
          style={
            {
              textAlign: 'left',
              fontSize: 16,
            }
          }
          text={ value }
        />
        <Button
          container={
            {
              marginBottom: 6,
              marginLeft: 6,
              marginRight: 6,
            }
          }
          text={
            {
              textAlign: 'center',
            }
          }
          style={
            {
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: 12,
              paddingRight: 12,
              backgroundColor: 'red',
            }
          }
          title="-"
          onPress={ this.onDelete }
        />
      </Wrapper>
    );
  }

  render() {
    const fixed = Object.entries(this.props.fixed).map(this.renderList);
    const variables = Object.entries(this.props.fixed).map(this.renderList);
    return (
      <Container>
        <Header>Kostnader</Header>
        { this.props.fixed && fixed }
        { this.props.variables && variables }
        <TextView>
          <Input
            keyboardType='numeric'
            border
            placeholder="Lägg till"
            id="fixed"
            onChange={ this.onFixedCostChange }
          />
        </TextView>
        <ButtonView>
          <Button
            container={
              {
                marginLeft: 6,
                marginRight: 6,
              }
            }
            text={
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
                backgroundColor: '#eee',
              }
            }
            title="+"
            onPress={ this.onFixedCostPress }
          />
        </ButtonView>
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  padding-top: 20px;
  display: flex;
  margin: 12px 0;
  flex-direction: column;
`;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0;
  text-align: center;
`;

export const TextView = styled.View`
flex: 2;
`;

export const ButtonView = styled.View`
flex: 1;
`;

const mapStateToProps = ({ reducers }) => {
  const { categories } = reducers;
  return {
    fixed: categories.categories.fixed,
    variables: categories.categories.variables,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    save: data => {
      return dispatch(saveCategoryData(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)