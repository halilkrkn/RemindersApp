import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity,FlatList } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import colors from '../Colors/Colors';
       

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style = {styles.container}>
                <View style={{flexDirection:"row"}}>
                    <View style={styles.divider}/>
                    <Text style={styles.title}>
                        Reminders <Text style={{fontWeight:"300",color:colors.blue}}>Lists</Text>
                    </Text>
                    <View style={styles.divider}/>
                </View>
                
                <View style = {styles.divider}>
                    <TouchableOpacity style={styles.addList}>
                        <AntDesign name="plus" size={16} color={colors.blue}/>
                    </TouchableOpacity>
                    <Text style= {styles.add}>Add Reminder</Text>
                </View>
            
            </View>
        )
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

        fontSize: 40,
        fontWeight:"800",
        color:colors.black,
        paddingHorizontal:64

    },

    addList: {
        borderWidth: 2,
        borderColor:colors.lightBlue,
        borderRadius:6,
        padding:16,
        alignItems: "center",
        justifyContent:"center"
    },
    
    add: {
        color:colors.blue,
        fontWeight: "600",
        fontSize: 15,
        marginTop: 8
    }

})
