import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { IconButton, Title } from 'react-native-paper'
import Fire from '../../Firebase'


export default class AddRoom extends Component {

    constructor(){
        super()
        this.state = {
            roomName: ''
        }
    }

    onHandlePress = () =>{
        const response = Fire.shared.addRoom(this.state.roomName)
        this.props.navigation.navigate('Home')
        console.log('Room Added')
    }


    render() {
        return (
            <View>
                <View style = {styles.closeButtonContained} >
                    <IconButton 
                        icon = 'close-circle'
                        size = {36}
                        color = '#6917fa'
                    />
                </View>

                <View style = {styles.roomInput} >
                    <Title>Enter the chat name:</Title>
                    <TextInput
                        labelName = 'Room Name'
                        value = {this.state.roomName}
                        onChangeText = {roomName => this.setState({ roomName })}
                        style = {styles.inputText}
                    />

                    <Button 
                        title  ='Create'
                        modeValue = 'contained'
                        onPress = {this.onHandlePress} 
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    closeButtonContained:{
        position: 'absolute',
        top: 5,
        right:0,
        zIndex: 5,
    },
    roomInput:{
        alignContent: 'center',
        marginVertical: 100,
        backgroundColor: 'blue',
        height: 300,
        width: '50%',
        marginHorizontal: 300
    },
    inputText:{
        alignContent: 'center',
        backgroundColor: 'green',
        height: 50,
        fontSize: 30
    }

})
