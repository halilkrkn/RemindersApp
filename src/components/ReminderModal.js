import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Animated
} from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons  } from "@expo/vector-icons";
import colors from "../Colors/Colors";


export default class ReminderModal extends Component {

  state = {
    newTodo: "",
  };

  toggleTodoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };


  addTodo = () => {
    let list = this.props.list

    if (!list.todos.some(todo => todo.title === this.state.newTodo)) {
          list.todos.push({title: this.state.newTodo, completed: false})
          this.props.updateList(list)
    }



    this.setState({newTodo: ""})
    Keyboard.dismiss()
  }

  deleteTodo = index => {
    let list = this.props.list
    list.todos.splice(index,1)

    this.props.updateList(list)
  }

  renderTodo = (todo, index) => {
    

    return (
      

      <View style={styles.todoContianer}>
        <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
          <Ionicons
            name={todo.completed ? "ios-square" : "square-outline"}
            size={24}
            color={colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? "line-through" : "none",
              color: todo.completed ? colors.gray : colors.black,
            },
          ]}
        >
          {todo.title}
        </Text>
        <TouchableOpacity 
        style={{ position: "absolute", top: 14, right: 12, zIndex: 10 }}
        onPress={() => this.deleteTodo(index)}
       >
        <MaterialCommunityIcons name="progress-close" size={24} color="black" />
        </TouchableOpacity>
      </View>
     
     
    );
  };

  render() {
    const list = this.props.list;

    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;

    return (
      <KeyboardAvoidingView style={{ flex: 1}} behavior="height">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 24, right: 12, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="closecircleo" size={30} color={colors.black} />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
            ]}
          >
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                Görevlerin {taskCount} / {completedCount} Yapıldı.
              </Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 1, marginVertical:16}]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
              keyExtractor={(item => item.title)}
              showsVerticalScrollIndicator={false}
            />

          </View>

          <View style={[styles.section, styles.footer]}>
            <TextInput
             style={[styles.input, { borderColor: list.color }]} 
             onChangeText={text => this.setState({newTodo: text})}
             value={this.state.newTodo}
             />
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: list.color,}]}
              onPress={() => this.addTodo()}
            >
              <AntDesign name="plus" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
    paddingTop:16
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.black,
  },
  taskCount: {
    marginTop: 6,
    marginBottom: 10,
    color: colors.gray,
    fontWeight: "bold",
  },
  footer: {
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical:16
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    marginRight: 8,
    paddingHorizontal: 8,
    marginBottom:15
  },
  addTodo: {
    borderRadius: 6,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:15
  },
  todoContianer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft:32
  },
  todo: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    flex:1,
    backgroundColor:colors.red,
    justifyContent:"center",
    alignItems: "center",
    width:80
  }
});
