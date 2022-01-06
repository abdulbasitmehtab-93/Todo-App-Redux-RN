import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from '../actions/ActionTypes';

const INITIAL_STATE = {todos: []};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {todos: [...state.todos, action.payload]};
    case REMOVE_TODO:
      return {todos: handleRemoveTodo(action.payload, state.todos)};
    case UPDATE_TODO:
      return {todos: handleUpdateTodo(action.payload, state.todos)};

    default:
      return state;
  }
};

const handleRemoveTodo = (item, todos) => {
  const todoIndex = todos.indexOf(item);
  todos.splice(todoIndex, 1);
  return todos;
};

const handleUpdateTodo = (data, todos) => {
  console.log({data});
  const oldValue = todos.slice();
  oldValue.splice(data.index, 1, data.item);
  return oldValue;
};

export default todoReducer;
