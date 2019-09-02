import React, {Component} from 'react';
import {TouchableNativeFeedback, View, Text, StyleSheet, Platform, Animated} from 'react-native'

class  ButtonDefault extends Component  { 
    state = {
        animButton: new Animated.Value(0)
    }
    
    animationHandler = () => {
        if(!this.props.disabled) {
            this.props.onPress()
        }
        Animated.timing(this.state.animButton, {
            toValue: 1,  
            duration: 50,
            useNativeDriver: true  
        }).start(() => {
            Animated.timing(this.state.animButton, {
                toValue: 0,  
                duration: 150,
                useNativeDriver: true
            }).start();             
        });
    }
    render() { 
        const content = (
            <View style = {[this.props.style, styles.button,   {backgroundColor: this.props.color, borderRadius: this.props.borderRadius | 20} ,this.props.disabled ? styles.disabled : null]}>   
                 <Text style = {[styles.text, {fontSize: this.props.font, color: this.props.textColor || 'white'}]}>{this.props.children}</Text>  
            </View>    
        );
    
            return ( 
            <Animated.View style = {[{ 
                transform: [
                    {
                        scale: this.state.animButton.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1]    
                        })  
                    }
                ] 
            ,flex: this.props.flex}]}>    

                    <TouchableNativeFeedback   onPress = {this.animationHandler} >     
                        {content} 
                    </TouchableNativeFeedback>

            </Animated.View>   
            );
    }
 
}
const styles = StyleSheet.create({
   text: {
       textAlign: 'center',
   },
   disabled: {
       backgroundColor: '#ccc',        
   },
   button: {
       padding: 10,    
   }
})

export default ButtonDefault;