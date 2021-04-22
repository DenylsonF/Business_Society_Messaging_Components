import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Button} from 'react-native'
import { Title } from 'react-native-paper'
import Fire from '../../Firebase'



export default class LoginScreen extends Component {
    
    constructor(){
        super()
        this.state = {
            name: 'Richard',
            email: 'test@live.com',
            password: '123456',
        }
    }

    onChangeTextName = name => this.setState({name});
    onChangeTextEmail = email => this.setState({email});
    onChangeTextPassword = password => this.setState({password});

    handlePressLogin = () =>{
        const user ={
            email: this.state.email,
            password: this.state.password
        }

        const response = Fire.shared
                            .login(
                                user, 
                                this.loginSuccess, 
                                this.loginFailed)
    }

    loginSuccess = () =>{
        this.props.navigation.navigate('Home', {
            name: this.state.name
        })
    }



    render(){
        return(
            <View style = {styles.Login} >
                <Title>Enter Your Credentails</Title>
                <TextInput 
                    value = {this.state.name}
                    name = 'name'
                    onChangeText = {this.onChangeTextName}
                    style = { styles.emailInput}
                />


                <TextInput 
                    value = {this.state.email}
                    name = 'email'
                    onChangeText = {this.onChangeTextEmail}
                    style = { styles.emailInput}
                />

                <TextInput 
                    value = {this.state.password}
                    name = 'password'
                    onChangeText = {this.onChangeTextPassword}
                    style = {styles.passwordInput}
                />

                <Button 
                    title  = "Login"
                    style = {styles.loginButton}
                    onPress = {this.handlePressLogin}
                />

                <Button 
                    title = 'Signup'
                    style = {styles.signupButton}
                    onPress = {() => this.props.navigation.navigate('Sign Up', {})}

                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Login:{
        width: '60%',
        backgroundColor : '#d59',
        alignItems: 'stretch',
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: 250,
        height: 400
    },
    passwordInput:{
        backgroundColor: '#fff',
        marginTop: 10,
        marginRight: 100,
        marginLeft: 100
    },
    emailInput:{
        backgroundColor: '#fff',
        marginTop: 10,
        marginLeft: 100,
        marginRight: 100,

    },
    nameInput:{
        backgroundColor: '#fff',
        marginTop: 10,
        marginLeft: 100,
        marginRight: 100,

    },
    loginButton:{
        backgroundColor: 'blue',
        marginTop: 100,
    },
    signupButton:{
        backgroundColor: 'red',
        marginTop: 100
    }
    
    
})
