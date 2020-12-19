import React, { Component } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView,TouchableOpacity,TextInput } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import colors from '../Colors/Colors'

export default class AddListModal extends Component {

    backgroundColors = ["#5CD859","#24A6D9","#0F5411","#5958D9","#8022D9","#D159D8","#D85963","#D88559","#321CCC"]

    state ={
        name:"",
        color:this.backgroundColors[0]
    }

    createTodo = () => {
        const {name,color} = this.state

        const list = {name, color}

        this.props.addList(list)

        this.setState({name: ""})
        this.props.closeModal()

    }

    renderColors(){

        return this.backgroundColors.map((color) => {
          return (
            <TouchableOpacity
              key={color}
              style={[styles.colorSelect, { backgroundColor: color }]}
              onPress={() => this.setState({ color })}
            />
          );
        });

    }


    render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={this.props.closeModal}
        >
          <AntDesign
            name="closecircleo"
            size={30}
            color={colors.black}
          ></AntDesign>
        </TouchableOpacity>

        <View style={styles.createTodoList}>
          <Text style={styles.title}> Hatırlatıcı Listesi Oluşturun</Text>

          <TextInput
            style={styles.input}
            placeholder="Hatırlatıcı Listesi Başlığınız?"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:14,}}>
              {this.renderColors()}
          </View>

          <TouchableOpacity
            style={[styles.create, { backgroundColor: this.state.color }]}
            onPress={this.createTodo}
          >
            <Text style={{ color: colors.white, fontWeight:"normal" }}>
              {" "}
              Oluştur{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableOpacity: {
    position: "absolute",
    top: 20,
    right: 10,
  },
  createTodoList: {
    alignSelf: "stretch",
    marginHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
    
  },
  input:{
      borderWidth:StyleSheet.hairlineWidth,
      borderColor:colors.blue,
      borderRadius:8,
      height:45,
      marginTop:8,
      paddingHorizontal:16,
      fontSize:18
  },
  create: {
      marginTop:24,
      height:48,
      borderRadius:8,
      alignItems:'center',
      justifyContent:'center'
  },
  colorSelect: {
      width: 30,
      height: 30,
      borderRadius:8,
  }
});
