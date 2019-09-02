import React from 'react';
import {Text, StyleSheet} from 'react-native'

const defaultText = (props) => { 

    return (
        <Text {...props} 
        style = {[props.color ? {color: props.color} : styles.textColor, props.style,  {fontSize: props.fontSize, fontWeight: props.fontWeight}]}
        >{props.children} </Text>
    ); 
    
}   
       
const styles = StyleSheet.create({
    textColor: {
       color:  '#454545', 
    }
})
export default defaultText; 