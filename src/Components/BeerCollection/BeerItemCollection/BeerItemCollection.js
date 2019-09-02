import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import IconM from 'react-native-vector-icons/MaterialIcons'; 
import DefaultText from '../../UI/DefaultText/DefaultText';
import {View, StyleSheet} from 'react-native';

 
const beerItemCollection = (props) => { 

    return (
            <View style = {styles.container}>   
                <View style = {[styles.iconContainer, {backgroundColor: props.color || '#c5c1c1'}]}>  
                    <Icon
                        color = 'white' 
                        borderWidth = {1}  
                        name ='beer' size = {30} />  
                </View>
                <View style = {styles.propContainer}>
                    <View style = {{width: '65%'}}>
                        <DefaultText fontWeight = {'500'}>{props.name}</DefaultText>
                        <DefaultText>{props.type}</DefaultText>   
                    </View>
                    <View style = {styles.overall}>
                    
                        <DefaultText fontWeight = {'500'}>{props.overall}/10</DefaultText>
                        <IconM  
                            color = '#ffb927'
                            name ='star' size = {25} />   
                    </View> 
                </View>
            </View>  
    );
       
} 

const styles = StyleSheet.create({
    container: {    
        alignItems: 'center',      
        flexDirection: 'row', 
        marginBottom: 5, 
        marginTop: 5, 
        paddingRight: 10,
        width: '100%', 
        height: 70,   
        borderColor: '#ccc',
        borderRadius: 5,     
        backgroundColor: 'white'
    },
    propContainer: {  
        flex: 1,      
        // backgroundColor: 'yellow',   
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: { 
        marginRight: 10, 
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 60,    
        // backgroundColor: '#c5c1c1',
        borderTopLeftRadius: 5,     
        borderBottomLeftRadius: 5,     

    },
    overall: {
        justifyContent: 'flex-end', 
        // backgroundColor: 'red',
        width: '35%',
        flexDirection: 'row',   
        alignItems: 'center' ,
    }
})

export default beerItemCollection;