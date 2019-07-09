import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import Category from "../components/Category";
import { boxShadow } from "../style/common";
import Button from "../components/Button";
import { saveAmount, getThisMonthAmount } from '../redux/actions/spendning';

import React, { Component } from "react";

class Toggle extends Component {
  state = {
    isOpen: false,
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

  renderList = (catetory, index) => (
    <Category index={index} key={index} {...catetory} />
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
    const icon = this.state.isOpen ? "add" : "delete";
    return (
      <Container style={boxShadow}>
        <Button type={icon} onPress={onToggle} />
        <View {...isOpen && { style: { display: "flex" } }}>
          { this.props.categories.map(renderList)}
        </View>
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
