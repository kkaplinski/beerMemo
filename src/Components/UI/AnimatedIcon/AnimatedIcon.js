import React, {Component} from 'react';
import {TouchableNativeFeedback, Animated} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';


class  AnimatedIcon extends Component  { 
    state = {
        animButton: new Animated.Value(0)
    }
    
    animationHandler = () => {
        if(this.props.disabled) {
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
            }).start()      
        });
    }
    render() { 

            return (  
            <Animated.View
                style = {[{ 
                    transform: [
                        {
                            scale: this.state.animButton.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.3]        
                            }) 
                        }
                    ] 
            }, this.props.style]}>   

                    <TouchableNativeFeedback   onPress = {this.animationHandler} >     
                        <Icon {...this.props}/>
                    </TouchableNativeFeedback>

            </Animated.View>
               
                
            );
    }
}

export default AnimatedIcon;