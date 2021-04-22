import React, { Component } from 'react'
import { Button, Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Divider, List } from 'react-native-paper';
import Fire from '../../Firebase'
import firebase from 'firebase'

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            threads: [],
        }
        console.log(this);
    }

    componentDidMount(){
        try{
            firebase
               .firestore()
               .collection("Threads")
               .onSnapshot((querySnapshot) =>{
                   const data  = querySnapshot.docs.map((documentSnapShot) =>{
                       return{
                           _id: documentSnapShot.id,
                           name: '',
                           ...documentSnapShot.data(),
                       };
                   })

                   this.setState({threads:data})
               })
                
       }catch(error){
           console.log(error)
       }
    }

    

    onPressAdd = () =>{ 
        this.props.navigation.navigate('Add Room')
    }

    onPressLogout = () =>{
        const response = Fire.shared.logout()
        this.props.navigation.pop()
    }

    onPressRoom = (place) =>{
        this.props.navigation.navigate('Room', {name: this.props.route.params.name, _id: place})
    }


    render() {
        // console.log(this.state.messages)
        // console.log(this.state.threads)

        // console.log(this.runQuery())

        return (
            <View>
                <Text> In Home </Text>
                <View>

                    <FlatList 
                        data = {this.state.threads}
                        keyExtractor ={(item) => item._id}
                        ItemSeparatorComponent = {() => <Divider/>}
                        renderItem = {({item})=>(
                                <List.Item 
                                title = {item.name}
                                description = 'This is the description'
                                titleNumberOfLines = {1}
                                descriptionNumberOfLines = {1}
                                onPress = {(() => this.onPressRoom(item._id))}
                                />
                        )}
                    />

                </View>

                <Button 
                    modeValue = 'contained'
                    title = "Logout"
                    onPress = {this.onPressLogout}
                />

                <Button 
                    modeValue = 'contained'
                    title = "Add Room"
                    style = {styles.addRoom}
                    onPress = {this.onPressAdd}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addRoom:{
        alignItems: 'center',
        alignContent: 'center'
    }
})
