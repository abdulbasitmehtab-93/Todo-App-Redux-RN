export const increment = () => {
  return {
    type: 'INCREMENT',
  };
};

export const add5 = n => {
  return {
    type: 'ADD-5',
    payload: n,
  };
};

export const decrement = () => {
  return {
    type: 'DECREMENT',
  };
};
