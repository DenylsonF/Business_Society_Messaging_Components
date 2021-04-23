import React, { Component } from 'react'
import { Button, View, StyleSheet, TextInput } from 'react-native'
import { Title } from 'react-native-paper'
import Fire from '../../Firebase'
import ImagePicker from 'react'

export default class SignUp extends Component {

    constructor(){
        super()
        this.state = {
            email: '',
            username: '',
            password: '',
            resourcePath: {}, 
        }
    }

    chooseImage = () =>{
        let options = {
            title: "Select Image",
            customButtons:[
                {
                    name_1: 'customOptionkey',
                    title: 'Choose file from Custom Option'
                },
            ],
            storageOptions:{
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, res =>{
            console.log('Response = ', res);

            if(res.didCancel){
                console.log('User cancelled image picker');
            }
            else if(res.error){
                console.log("Image Picker Error: ", res.error);
            }
            else if(res.customButtons){
                console.log("User tapped custom button: ", res.customButtons);
                alert(res.customButtons)
            }
            else{
                let source = res;
                this.setState({
                    resourcePath: source
                });
            }
        });
    };

    handlePress = () =>{
        const user = { 
            name: this.state.username,
            email: this.state.email ,
            password: this.state.password
        }
        
        const response = Fire.shared.createAccount(user)
        this.props.navigation.navigate('Login')
    }

    onChangeTextEmail = email => this.setState({email})
    onChangeTextPassword = password => this.setState({password})
    onChangeTextName = username => this.setState({username})
    
    render() {
        return (
            <View>
                <View style = {styles.container} >
                    <Title>Welcome to the app register your information</Title>
                </View>

                <View style = {styles.inputContainers} >
                    <TextInput 
                        value = {this.state.username}
                        name = 'username'
                        placeholder = 'Name'
                        style = {styles.nameInput}
                        onChangeText = {this.onChangeTextName}
                    />

                    <TextInput 
                        value = {this.state.email}
                        name = 'email'
                        placeholder = 'Email'
                        style = {styles.emailInput}
                        onChangeText = {this.onChangeTextEmail}
                    />

                    <TextInput 
                        value = {this.state.password}
                        name = 'password'
                        placeholder = 'Password'
                        style = {styles.passwordInput}
                        onChangeText = {this.onChangeTextPassword}
                    />

                    <Button
                        title = "Choose an avatar"
                        onPress = {this.chooseImage}
                    />
                    
                    <Button 
                        title = 'register'
                        style = {styles.registerButton}
                        onPress = {this.handlePress}
                    />
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: 'gold'
    },
    inputContainers:{
        alignItems: 'center',
        backgroundColor: '#299',
        marginTop: 100,
        marginHorizontal: 250,
        width: '60%',
        margin: 20

    },
    nameInput:{
        margin: 20,
        fontSize:20,
    },
    emailInput:{
        margin: 20,
        fontSize:20,
        marginVertical: 20,
        backgroundColor: 'gold'
    },
    passwordInput:{
        margin: 20,
        fontSize:20,
    },
    registerButton:{
        width: '800%'
    }

})