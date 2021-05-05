import React,{useState, useEffect} from 'react'
import {StatusBar} from 'expo-status-bar'
import {StyleSheet, Text, View, Platform, Button} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants'

export default function Image(props) {

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
            props.image = result.uri
        }
    }


    return (
        <View>
            <Button title = "Choose an avatar" onPress = {PickImage}/>
        </View>
    )
}
