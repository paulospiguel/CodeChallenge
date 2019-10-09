import React, { Component } from 'react';
import * as moment from 'moment';
import 'moment/locale/pt';
import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  background: #fff;
  padding: 5px;
  margin: 10px 0;
  border-radius: 4px;
  font-weight: bold;
  color: #7159c1;
`;
export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('LLL:ss'),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: moment().format('LLL:ss'),
    });
  }

  render() {
    return <Container>{this.state.date}</Container>;
  }
}
