import React, { Component } from 'react'
import { Button, View, StyleSheet, TextInput } from 'react-native'
import { Title } from 'react-native-paper'
import Fire from '../../Firebase'
import Image from './Image'

const options = {
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
}

export default class SignUp extends Component {

    constructor(){
        super()
        this.state = {
            email: '',
            username: '',
            password: '',
            image: null
        }
        this.Image = this.Image.bind(this);
    }
    
    Image(props) {

        useEffect ( async() =>{
            if(Platform.OS !== 'web'){
                const {status} = await ImagePicker.requestLibraryPermissionsAsync();
                if (status !== 'granted'){
                    alert("Permission denied")
                }
            }
        }, [])
    
        const PickImage = async () =>{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            })
            
            console.log(result)
            if(!result.cancelled){
                this.setState({image : result.uri})
            }
        }
    
    
        return (
            <View>
                <Button title = "Choose an avatar" onPress = {PickImage}/>
            </View>
        )
    }


    handlePress = () =>{
        if (this.state.image == null ){
            const user = { 
                name: this.state.username,
                email: this.state.email ,
                password: this.state.password,
            }
        }
        else{
            const user = { 
                name: this.state.username,
                email: this.state.email ,
                password: this.state.password,
                image: this.state.image,
            }
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

                    <Image image = {this.state.image} />
                    
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