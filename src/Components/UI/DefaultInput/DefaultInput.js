import React from 'react';
import {TextInput, StyleSheet} from 'react-native'

const defaultInput = (props) => { 

    return (
        <TextInput
        {...props}
        style = {[styles.input, props.style, !props.valid && props.touched ? styles.invalid : styles.valid]}
        placeholderTextColor = 'grey' />   
    ); 

} 
       
const styles = StyleSheet.create({
    input: {
        padding: 5,
        textAlign: 'center',
        marginBottom: 5, 
        marginTop: 10, 
        width: '100%',
        borderColor: '#e1dddc',
        borderWidth: 1,     
        borderRadius: 20,     
        backgroundColor: 'white'
    },
    invalid: {
        borderWidth: 1,     
        borderColor: '#db4437',
        color: '#db4437'
    },
    valid: {
        color: '#333333'
    }
})
export default defaultInput; 