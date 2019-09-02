import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import DefaultText from './../UI/DefaultText/DefaultText';
import IconM from 'react-native-vector-icons/MaterialIcons'; 
import BeerBottle from './BeerBottle/BeerBottle';
import AnimatedObject from '../UI/AnimatedObject/AnimatedObject';

class BeerDetailItem extends Component  { 

    goToEditMode = () => {
        Navigation.push(this.props.componentId, {
            component: {
              name: 'navigation.playground.BeerEdit',
              passProps: {
                iconLeft: this.props.iconLeft,
                beerData: this.props.beerData, // sending beerData to Edit Beer Component
              }, 
            },
          });  
    }


    render() {

        let starProperties = [];
      
        for (prop of ['taste', 'bitter', 'smell', 'overall'])  { 
            starProperties.push(           
            <View key = {prop}  >       
                <View style = {styles.starsRate}>
                    <DefaultText color = {'white'} fontSize = {16}>{prop.charAt(0).toUpperCase() + prop.slice(1)}</DefaultText>
                    <View style = {styles.stars}>
                        <DefaultText color = {'white'} fontSize = {16} fontWeight = {'500'}>{this.props.beerData[prop]}/10</DefaultText> 
                        <IconM   
                            color = '#ffb927'
                            name ='star' size = {24} /> 
                    </View>   
                </View>
            </View> )
        }  

        return (
            <View style = {styles.container}>
                <BeerBottle beerData = {this.props.beerData}/>  
                    <View style = {styles.gradeContainer}>
                        <View style = {styles.descriptionContainer}>
                            <DefaultText color = {'white'} fontSize = {16} fontWeight = {'500'}>
                                Description   
                            </DefaultText> 
                            <DefaultText color = {'white'} fontSize = {14}>  
                            {this.props.beerData.addInfo}
                            </DefaultText>
                        </View>
                        <View style = {styles.starContainer}>
                        {starProperties}
                        </View>
                        <AnimatedObject onPress = {this.goToEditMode}>
                            <View style = {styles.editButton}>
                                <IconM  
                                    style = {{marginRight: 10}} 
                                    color = '#a6a6a6'
                                    name ='edit' size = {24} /> 
                                <DefaultText
                                    color = '#a6a6a6'
                                    fontSize = {16}
                                    fontWeight = '400'
                                    >   
                                    Edit Beer
                                </DefaultText>
                            </View>
                        </AnimatedObject>                       
                    </View>
            </View> 
        );  
    }
    

}
const styles = StyleSheet.create({   
    container: {
        width: '100%',      
        height: '100%',  
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',  
    },
    gradeContainer: {
        flex: 1,
        padding: 10, 
        height: '100%',
        backgroundColor: '#666666'
    },
    descriptionContainer: {
        flex: 1,
        // backgroundColor: 'red' 
    },
    starContainer: {
        flex: 1, 
        width: '100%', 
        flexDirection: 'column', 
        justifyContent: 'flex-start'
    },
    starsRate: {
        paddingTop: 10,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between'  
    },
    stars: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between'  
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
          
        
    }
    
  }) 
  
export default BeerDetailItem;