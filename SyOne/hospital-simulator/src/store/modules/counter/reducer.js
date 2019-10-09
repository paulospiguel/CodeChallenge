const INITIAL_STATE = {
  count: localStorage.getItem('@hospiral-simulator/count'),
};

const ToggleCounter = state => {
  const valueCount = '@hospiral-simulator/count';
  let newCount = state.count;
  newCount = ++newCount;
  localStorage.setItem(valueCount, newCount);
  return newCount;
};

export default function counter(state = INITIAL_STATE, action) {
  if (action.type === 'TOGGLE_COUNTER') {
    return { ...state, count: ToggleCounter(state) };
  }
  return state;
}
