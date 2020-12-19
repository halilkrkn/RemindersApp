import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import colors from '../Colors/Colors'
import ReminderModal from '../components/ReminderModal'
import { AntDesign, Ionicons, MaterialCommunityIcons  } from "@expo/vector-icons";


export default class ReminderList extends React.Component {

    state = {
        showListVisible: false
    }

    toggleListModal(){
        this.setState({showListVisible: !this.state.showListVisible})
    }
    
    deleteList = list => {
      firebase.deleteList(list)
    }

    render(){
      const list = this.props.list;

      const completedCount = list.todos.filter(todo => todo.completed).length;
      const remainingCount = list.todos.length - completedCount;

      return (
        <View>
          <Modal
            animationType="slide"
            visible={this.state.showListVisible}
            onRequestClose={() => this.toggleListModal()}
          >
            <ReminderModal
              list={list}
              closeModal={() => this.toggleListModal()}
              updateList={this.props.updateList}
            
            />
          </Modal>

          <TouchableOpacity
            style={[styles.listContainer, { backgroundColor: list.color }]}
            onPress={() => this.toggleListModal()}
          >
            <Text style={styles.listTitle} numberOfLines={1}>
              {list.name}
            </Text>
            <View>
            <TouchableOpacity 
        style={{ position: "absolute", top: -74, right: -35, zIndex: 10 }}
            onPress={() =>this.deleteList(list)}
          >
        <MaterialCommunityIcons name="progress-close" size={24} color="white" />
        </TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.count}>{remainingCount}</Text>
                <Text style={styles.subtitle}>Kalan Görevler</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.count}>{completedCount}</Text>
                <Text style={styles.subtitle}>Tamamlanan Görevler</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

}



const styles = StyleSheet.create({

    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200
    },

    touchableOpacity: {
      position: "absolute",
      top: 20,
      right: 10,
    },

    listTitle: {

        fontSize: 24,
        fontWeight: "700",
        color: colors.white,
        marginBottom:18

    },
    
    count: {
        fontSize: 48,
        fontWeight:  "200",
        color: colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.white
    }



})
