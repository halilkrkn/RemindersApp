import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList, Modal, ActivityIndicator} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import {AntDesign} from '@expo/vector-icons'
import tempData from './src/service/tempData'
import ReminderList from './src/components/ReminderList' 
import AddListModal from './src/components/AddListModal'
import Firebase from './src/service/Firebase'
import colors from './src/Colors/Colors'
export default class App extends React.Component {

  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true
  }


  componentDidMount() {
        firebase = new Firebase((error,user) => {
          if (error) {
            return alert("Uh no, something went wrong")
          }

          firebase.getLists(lists => {
            this.setState({lists,user}, () =>{

              this.setState({loading: false})

            })
          })

          this.setState({user})
        //  console.log(this.state.user.uid)
        })
  }


  componentWillUnmount(){
    firebase.detach()
  }



  toggleAddTodoModal() {
    this.setState({addTodoVisible: !this.state.addTodoVisible})
  }

  renderList = list =>{
    return <ReminderList list={list} updateList={this.updateList}/>
  }

  addList = list => {
  
    firebase.addList({
      name:list.name,
      color:list.color,
      todos: []
    })
  
  }

  updateList = list => {
   firebase.updateList(list)
  }

  render() {

    if (this.state.loading) {
      return (

        <View style = {styles.container}>

            <ActivityIndicator size = "large" color={colors.blue}/>

        </View>


      )
    }




    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Reminders{" "}
            <Text style={{ fontWeight: "300", color: colors.blue }}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}
          >
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>

          <Text style={styles.add}>Add Reminder</Text>
        </View>

        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container:{
      flex:1,
      backgroundColor:"#fff",
      alignItems:"center",
      justifyContent:"center"
  },
  
  divider: {

      backgroundColor: colors.lightBlue,
      height:1,
      flex:1,
      alignSelf:"center"
  },
  title: {

      fontSize: 35,
      fontWeight:"bold",
      color:colors.black,
      paddingHorizontal:64

  },

  addList: {
      borderWidth: 2,
      borderColor:colors.lightBlue,
      borderRadius:9,
      padding:16,
      alignItems: "center",
      justifyContent:"center"
  },
  
  add: {
      color:colors.blue,
      fontWeight: "800",
      fontSize: 14,
      marginTop: 8
  }

})
