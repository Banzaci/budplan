import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Label from '../components/Label';
import Button from '../components/Button';
import InputButton from '../components/Input-button';
import { saveCategoryData } from '../redux/actions/categories';

class Category extends Component {

  state = {
    fetching: false,
    value: '',
    id: 0,
  }
  onPress = e => {
    const { value, id, exist } = this.state;
    if (exist) return;

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
    const temp = this.props[id];
    if (temp) {
      const exist = Object.entries(temp).some(([_, name]) => value.toLowerCase() === name.toLowerCase());
      this.setState({
        exist,
        value,
        id
      })
    }
  }

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
    // const variables = Object.entries(this.props.variables).map(this.renderList);
    return (
      <Container>
        <Header>Kostnader</Header>
        { this.props.fixed && fixed }
        {/* { this.props.variables && variables } */}
        <InputButton
          onChange={ this.onChange }
          onPress={ this.onPress }
          placeholder="Lägg till kostnadstyp"
          keyboardType="numeric"
          id="fixed"
          backgroundColor="#eee"
          shadow
        />
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

const Header = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0;
  text-align: center;
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