import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Fire from '../../Firebase'
import firebase from 'firebase'


export default class Room extends Component {

    constructor(){
        super();
        this.state = {
            messages: [
                {
                    _id:1,
                    text: "Hello developer",
                    user:{
                        _id: 2,
                        name: 'React-Native',
                    },
                }
            ]
        }
        console.log(this)
    }

    get user(){
        return{
            name: this.props.route.params.name,
            _id: Fire.shared.uid,
        }
    }

    componentDidMount(){

        try{
            const data = this.runQuery()

            firebase.firestore()
                .collection("Threads")
                .doc(this.props.route.params._id)
                .collection("Messages")
                .orderBy("createdAt", "desc")
                .onSnapshot(snapshot =>{
                    const data = snapshot.docs.map( document=>{
                        return{
                            _id:document.id,
                            ...document.data()
                        }
                    })

                    this.setState({messages: data})
                })

            
        }catch(err){
            console.log(err)
        }
    }

    getMessages = async() => {
        const collection = firebase.firestore().collection("Threads").doc("Room_5").collection("Messages")

        const snapshot = await collection.get()
        return snapshot.docs.map(doc =>({_id: doc.id, ...doc.data()}));
    }

    runQuery = async() =>{
        const data = await this.getMessages();
        this.setState(this.state.messages = data)
    }

    onSend = async(messages) =>{
        try{
            const text = messages[0].text

            await firebase
                .firestore()
                .collection("Threads")
                .doc(this.props.route.params._id)
                .collection('Messages')
                .add({
                    text,
                    user: this.user,
                    createdAt: new Date().getTime()
                })

        }catch(err){
            console.log(err)
        }
    }

    render() {
        return (
                <GiftedChat
                    messages = {this.state.messages}
                    onSend = { this.onSend }
                    user = {this.user}
                />
            
        )
    }

    componentWillUnmount(){
        Fire.shared.off();
    }
}
