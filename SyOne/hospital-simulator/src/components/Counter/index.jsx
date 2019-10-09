import React from "react";

import { connect } from "react-redux";

function Counter({ count }) {
  return <p>O programa foi executado: {count}</p>;
}
export default connect(state => ({
  count: state.counter.count
}))(Counter);
