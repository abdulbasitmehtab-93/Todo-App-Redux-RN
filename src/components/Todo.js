import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {AddTodo, RemoveTodo, UpdateTodo} from '../actions/todoActions';

let deviceWidth = Dimensions.get('window').width;

const Todo = () => {
  const [todoValue, setTodoValue] = useState('');
  const [todoEditValue, setTodoEditValue] = useState('');
  const [todoEditIndex, setTodoEditIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(state => state);

  const todos = data.todos.todos;

  const addTodo = () => {
    if (todos && !todos.includes(todoValue)) {
      if (todoValue === '') {
        alert('Please enter some text first!');
        return;
      } else {
        dispatch(AddTodo(todoValue));
        setTodoValue('');
      }
    } else {
      alert(`${todoValue} already added in Todo List`);
    }
    Keyboard.dismiss();
    console.log('todos --> ', todos);
  };

  const removeTodo = item => {
    const todoIndex = todos.indexOf(item);
    console.log('todo index --> ', todoIndex);
    if (todoIndex > -1) {
      dispatch(RemoveTodo(item));
    } else {
      alert(`${todoValue} does not exist in Todo List`);
    }
  };

  const updateTodo = item => {
    dispatch(UpdateTodo({item, index: todoEditIndex}));
    resetState();
  };

  const renderTodoList = () => {
    return (
      <FlatList
        data={todos}
        renderItem={({item, index}) => (
          <View style={styles.todoView}>
            <View style={styles.todoList}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeTodo}
              onPress={() => removeTodo(item)}>
              <Icon name="trash" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.updateTodo}
              onPress={() => toggleModal(item, index)}>
              <FontAwesomeIcon name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  const toggleModal = (item, index) => {
    setModalVisible(!modalVisible);
    setTodoEditValue(item);
    setTodoEditIndex(index);
    console.log('Modal opened... ', item);
  };

  const resetState = () => {
    setModalVisible(false);
    setTodoEditValue('');
    setTodoEditIndex(null);
  };

  return (
    <View style={styles.main}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText]}>Edit Todo</Text>
            <TextInput
              style={styles.modalInput}
              value={todoEditValue}
              onChangeText={text => setTodoEditValue(text)}
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.button, styles.buttonSave]}
                onPress={() => updateTodo(todoEditValue)}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TextInput
        style={styles.mainInput}
        onChangeText={setTodoValue}
        placeholder="Add your Todo Here"
        value={todoValue}
      />
      <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
        <Text style={styles.btnText}>Add Todo</Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#000000',
          margin: 15,
          textAlign: 'center',
        }}>
        List of Todos:
      </Text>
      {renderTodoList()}
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  mainInput: {
    borderWidth: 1,
    height: 55,
    width: deviceWidth * 0.9,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 9,
  },
  modalInput: {
    borderWidth: 1,
    height: 50,
    width: deviceWidth * 0.78,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 9,
  },
  todoList: {
    borderWidth: 1,
    borderRadius: 10,
    width: deviceWidth * 0.65,
    height: 45,
    padding: 10,
  },
  todoView: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 5,
  },
  removeTodo: {
    backgroundColor: 'red',
    borderRadius: 4,
    marginLeft: 10,
    padding: 10,
  },
  updateTodo: {
    backgroundColor: 'blue',
    borderRadius: 4,
    marginLeft: 10,
    padding: 10,
  },
  itemText: {
    color: '#000000',
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: '#26A2FB',
    padding: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 90,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonSave: {
    backgroundColor: '#2196F3',
    marginRight: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});
