import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import Category from "../components/Category";
import { boxShadow } from "../style/common";
import Button from "../components/Button";
import { Container } from './toggle-style';
import { saveAmount, getThisMonthAmount } from '../redux/actions/spendning';

class Toggle extends Component {
  state = {
    isOpen: true,
    categories: []
  };

  async componentDidMount() {
    const props = await this.props.dispatch(getThisMonthAmount());
    this.setState({
      ...props
    });
  }

  onToggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  };

  renderList = (catetory, index) => console.log(catetory)||(
    <Category key={index} catetory={catetory} />
  );

  onAmountChange = ({ currentDay, amount }) => {
    const { currentYear, currentMonth } = this.state;
    this.props
      .save({ currentYear, currentMonth, day: currentDay, amount })
      .then(({ total, average, week, weekNumber }) => {
        this.setState({
          total,
          average,
          week,
          weekNumber
        });
      });
  };

  render() {
    const { categories } = this.props;
    const { isOpen } = this.state;
    const icon = isOpen ? 'add' : 'delete';
    const title = isOpen ? 'Stäng' : 'Öppna';
    return (
      <Container style={ boxShadow }>
        <Button title={ title } type={ icon } onPress={ this.onToggle } />
        { isOpen && this.props.categories.map(this.renderList) }
      </Container>
    );
  }
}

const mapStateToProps = ({ reducers }) => {
  const { category, target } = reducers;
  return {
    categories: category.categories,
    monthlyBudget: target.monthlyBudget,
  };
};

const mapDispatchToProps = dispatch => {
    return {
      dispatch,
      save: (data) => {
        return dispatch(saveAmount(data))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
