import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native'; 
import AnimatedIcon from '../../UI/AnimatedIcon/AnimatedIcon';      
import DefaultText from '../../UI/DefaultText/DefaultText';
import Icon from 'react-native-vector-icons/MaterialIcons';


const beerSortPanel = (props) => {   

    return (
        <View style = {styles.container}>
            <View style = {styles.searchContainer}>
                <Icon color = '#ADADAD' name = 'search' size = {30}/>   
                <TextInput onChangeText = {(val) => props.onSearchChange(val)} style = {styles.searchInput} placeholder = 'search'></TextInput>
            </View> 
            <View style = {styles.sortContainer}>
                <View style = {styles.sortItem}>
                    <DefaultText>By name</DefaultText>
                    <View style = {styles.sortPanel}>
                        <AnimatedIcon 
                            name='keyboard-arrow-up'        
                            size = {30}   
                            iconStyle = {{marginRight: 0}} 
                            style = {{margin: 0, padding: 0}}  
                            backgroundColor = 'transparent'     
                            onPress = {props.sortByNameUp}   
                                        />     
                        <AnimatedIcon 
                            name='keyboard-arrow-down'        
                            size = {30}   
                            iconStyle = {{marginRight: 0}} 
                            style = {{margin: 0, padding: 0}}  
                            backgroundColor = 'transparent'     
                            onPress = {props.sortByNameDown}  
                                        />     
                    </View>
                </View>
                
                <View style = {styles.sortItem}>
                    <DefaultText>By type</DefaultText>
                    <View style = {styles.sortPanel}>
                        <AnimatedIcon 
                            name='keyboard-arrow-up'        
                            size = {30}   
                            iconStyle = {{marginRight: 0}} 
                            style = {{margin: 0, padding: 0}}  
                            backgroundColor = 'transparent'     
                            onPress = {props.sortByTypeUp}  
                                        />     
                        <AnimatedIcon 
                            name='keyboard-arrow-down'        
                            size = {30}   
                            iconStyle = {{marginRight: 0}}  
                            style = {{margin: 0, padding: 0}}  
                            backgroundColor = 'transparent'     
                            onPress = {props.sortByTypeDown}  
                                        />     
                    </View>  
                </View>
            
                <View style = {styles.sortItem}>
                    <DefaultText >By Overall</DefaultText>
                    <View style = {styles.sortPanel}>
                        <AnimatedIcon 
                            name='keyboard-arrow-up'        
                            size = {30}   
                            iconStyle = {{marginRight: 0}} 
                            style = {{margin: 0, padding: 0}}  
                            backgroundColor = 'transparent'     
                            onPress = {props.sortByOverallUp}  
                                        />     
                        <AnimatedIcon 
                            name='keyboard-arrow-down'        
                            size = {30}     
                            iconStyle = {{marginRight: 0}}  
                            style = {{margin: 0, padding: 0}}  
                            backgroundColor = 'transparent'     
                            onPress = {props.sortByOverallDown}  
                                        />     
                    </View>  
                </View> 
            </View>
        </View>
    );

}

const styles = StyleSheet.create({ 
    container: {
        width: '85%',
    },
    sortContainer: { 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',  
        paddingTop: 5
    }, 
    sortItem: {
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    sortPanel: {
        flexDirection: 'row',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchInput: {
        marginLeft: 5,
        flex: 1,
        borderBottomColor: '#ADADAD',
        borderBottomWidth: 1,
        padding: 0,
    }
  }) 
  

export default beerSortPanel;