import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { allLetters } from '../utils/check-if-valid';
import Label from '../components/Label';
import Button from '../components/Button';
import InputButton from '../components/Input-button';
import { saveCategoryData, getCategoryData } from '../redux/actions/categories';

class Category extends Component {

  state = {
    variable: {},
    fixed: {},
    fetching: false,
    error: false,
  }

  async componentDidMount(){
    const { data } = await this.props.dispatch(getCategoryData());
    this.setState({
      ...data,
    })
  }

  onPress = ({ value, id }) => {
    
    const validValue = allLetters(value);
    if (!validValue) {
      this.setState({
        error: 'unvalidstring'
      })
    } else {
      const temp = this.props[id];
      const exist = temp && Object.entries(temp).some(([_, name]) => value.toLowerCase() === name.toLowerCase());
      if (exist) {
        this.setState({
          error: 'stringexist'
        });
      } else {
        this.setState({
          error: false,
          fetching: true
        })
        this.props.save({ value, id })
          .then(({ data }) => {
            console.log(data)
            this.setState({
              ...data,
              fetching: false
            });
          });
      }    
    }
  }

  isDisabled = () => this.state.fetching || this.state.error

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
    const fixed = Object.entries(this.state.fixed).map(this.renderList);
    const variable = Object.entries(this.state.variable).map(this.renderList);
    return (
      <Container>
        <Header>Kostnader</Header>
        <SubHeader>Fasta kostnader</SubHeader>
        { this.state.fixed && fixed }
        <InputButton
          style={ { marginTop: 20 }}
          onPress={ this.onPress }
          placeholder="Lägg till kostnadstyp"
          keyboardType="default"
          id="fixed"
          backgroundColor="#eee"
          disabled={ this.isDisabled() }
          shadow
        />
        <SubHeader>Rörliga kostnader</SubHeader>
        { this.state.variable && variable }
        <InputButton
          style={ { marginTop: 20 }}
          onPress={ this.onPress }
          placeholder="Lägg till kostnadstyp"
          keyboardType="default"
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
  return {}
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