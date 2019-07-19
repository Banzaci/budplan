import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { allLetters } from '../utils/check-if-valid';
import Label from '../components/Label';
import Button from '../components/Button';
import InputButton from '../components/Input-button';
import { saveCategoryData } from '../redux/actions/categories';

class Category extends Component {

  state = {
    fetching: false,
    error: false,
    value: '',
    id: 0,
  }
  onPress = e => {
    const { value, id, exist, error } = this.state;
    if (exist || error) return;

    this.setState({
      fetching: true
    });
    this.props.save({ value, id })
      .then((props) => {
        this.setState({
          fetching: false
        });
      });
  }

  onChange = ({ value, id }) => {
    const validValue = allLetters(value);
    if (!validValue) {
      this.setState({
        error: 'unvalidstring'
      })
    } else {
      const temp = this.props[id];
      this.setState({
        error: false
      });
      if (temp) {
        console.log(value)
        const exist = Object.entries(temp).some(([_, name]) => value.toLowerCase() === name.toLowerCase());
        console.log(exist)
        this.setState({
          error: exist ? 'stringexist' : false,
          value: validValue,
          id
        })
      }
    }
  }

  isDisabled = () => this.state.fetching || this.state.error || this.state.value.length < 1

  renderList = ([_, value], index) => {
    return (
      <Row
        key={ index }
      >
        <Label
          style={
            {
              textAlign: 'left',
              fontSize: 14,
            }
          }
          text={ value }
        />
        <Button
          containerStyle={
            {
              marginBottom: 6,
              marginLeft: 6,
              marginRight: 6,
            }
          }
          textStyle={
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
            }
          }
          title="-"
          onPress={ this.onDelete }
        />
      </Row>
    );
  }

  render() {
    const fixed = Object.entries(this.props.fixed).map(this.renderList);
    const variable = Object.entries(this.props.variable).map(this.renderList);
    return (
      <Container>
        <Header>Kostnader</Header>
        <SubHeader>Fasta kostnader</SubHeader>
        { this.props.fixed && fixed }
        <InputButton
          style={ { marginTop: 20 }}
          onChange={ this.onChange }
          onPress={ this.onPress }
          placeholder="Lägg till kostnadstyp"
          keyboardType="numeric"
          id="fixed"
          backgroundColor="#eee"
          disabled={ this.isDisabled() }
          shadow
        />
        <SubHeader>Rörliga kostnader</SubHeader>
        { this.props.variable && variable }
        <InputButton
          style={ { marginTop: 20 }}
          onChange={ this.onChange }
          onPress={ this.onPress }
          placeholder="Lägg till kostnadstyp"
          keyboardType="numeric"
          id="variable"
          backgroundColor="#eee"
          disabled={ this.isDisabled() }
          shadow
        />
      </Container>
    );
  }
}

const Container = styled.SafeAreaView`
  padding-top: 20px;
  display: flex;
  margin: 12px;
  flex-direction: column;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0;
  text-align: center;
`;

const SubHeader = styled.Text`
  font-size: 14px;
  font-weight: bold;
  padding: 20px 0 10px;
  text-align: left;
`;

const mapStateToProps = ({ reducers }) => {
  const { categories } = reducers;
  return {
    fixed: categories.categories.fixed,
    variable: categories.categories.variable,
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