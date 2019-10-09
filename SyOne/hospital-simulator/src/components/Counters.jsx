import React from 'react';
import { connect } from 'react-redux';

const Counter = props => <p>Você tem {props.todos.length} itens na lista</p>;

const mapStateToProps = state => ({
  todos: state.todos,
});

export default connect(mapStateToProps)(Counter);
