import React from 'react';

import {Provider} from 'react-redux';

import {createStore} from 'redux';

import Todo from './src/components/Todo';

import rootReducer from './src/reducers/rootReducer';

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
};

export default App;

// =====================================================================================================================

// Redux Tutorial:
// ==================================================================================================================

// import React from 'react';
// import {View, Text} from 'react-native';
// import {createStore} from 'redux';
// import allReducers from './src/reducers';
// import {Provider} from 'react-redux';

// import ReduxDemo from './src/Screens/ReduxDemo';

// const store = createStore(allReducers);

// const App = () => {
//   return (
//     <Provider store={store}>
//       <ReduxDemo />
//     </Provider>
//   );
// };

// export default App;
