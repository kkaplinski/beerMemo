import React, {Component} from 'react';
import {TouchableNativeFeedback, Animated, View} from 'react-native'


class  AnimatedObject extends Component  { 
    state = {
        animButton: new Animated.Value(0)
    }
    
    animationHandler = () => {
        Animated.timing(this.state.animButton, {
            toValue: 1,  
            duration: 150,
            useNativeDriver: true  
        }).start(() => {
            Animated.timing(this.state.animButton, {
                toValue: 0,  
                duration: 100,
                useNativeDriver: true
            }).start(() => { 
                this.props.onPress()
            });
             
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
                                outputRange: [1, 1.05]         
                            }) 
                        } 
                    ] 
            }, this.props.style]}>   

                    <TouchableNativeFeedback disabled = {this.props.disabled}  onPress = {this.animationHandler} > 
                        <View style = {{width: '100%'}}>  
                            {this.props.children}
                        </View>    
                    </TouchableNativeFeedback>

            </Animated.View>
               
                
            );
    }
}

export default AnimatedObject;