import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, add5} from '../actions';

const ReduxDemo = () => {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>
        Counter
      </Text>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>
        {counter}
      </Text>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'purple',
            padding: 10,
            margin: 10,
            width: 50,
          }}
          onPress={() => dispatch(increment())}>
          <Text style={{fontSize: 30, color: '#FFF', textAlign: 'center'}}>
            +
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'purple',
            padding: 10,
            margin: 10,
            width: 50,
          }}
          onPress={() => dispatch(decrement())}>
          <Text style={{fontSize: 30, color: '#FFF', textAlign: 'center'}}>
            -
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'purple',
            padding: 10,
            margin: 10,
            width: 100,
          }}
          onPress={() => dispatch(add5(5))}>
          <Text style={{fontSize: 30, color: '#FFF', textAlign: 'center'}}>
            Add 5
          </Text>
        </TouchableOpacity>
      </View>

      {isLogged ? (
        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>
          Protected data / resource
        </Text>
      ) : null}
    </View>
  );
};

export default ReduxDemo;
