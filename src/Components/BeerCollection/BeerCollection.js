import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import { Navigation } from 'react-native-navigation';
import {View, ScrollView, StyleSheet} from 'react-native';
import AnimatedObject from './../UI/AnimatedObject/AnimatedObject';
import BeerItemCollection from './BeerItemCollection/BeerItemCollection';



class BeerCollection extends Component { 
    state = {
        selectedBeer: null
    }

    beerClickHandler = (name, beerData) => {
        if(this.state.selectedBeer !== beerData.id) {
            this.setState({ 
                selectedBeer: beerData.id
            })
            Promise.all([
                Icon.getImageSource( 'arrow-left', 25, 'grey'),   
                Icon.getImageSource( 'trash', 25, '#ea4335')    
            ]) 
            .then(source => { 
                    Navigation.push(this.props.componentId, {
                        component: {
                          name: 'navigation.playground.BeerDetail',
                          passProps: {
                            title: name,
                            beerDataId: beerData.id, // sending unique id to Detail Beer Component 
                            iconLeft: { uri: source[0].uri },
                            iconRight: { uri: source[1].uri } 
                          }, 
                        },
                      });  
            })
             
        }    
      } 
    resetSelectedBeer() {
        this.setState({
            selectedBeer: null
        })
    }
      

    render() {

        let beerCollection = []
          
        if(this.props.beerData) {
            for (let beer of this.props.beerData) {
                beerCollection.push( 
                    <AnimatedObject key = {beer.id} onPress = {() => this.beerClickHandler(beer.name, beer)}>
                            <BeerItemCollection type = {beer.type} overall = {beer.overall} color = {beer.color}  name ={beer.name}/> 
                    </AnimatedObject>

                )
            }   
        } 

        return (
            <View style = {styles.container}>
                {beerCollection}
            </View>
        );

    }

}

const styles = StyleSheet.create({ 
    container: { 
        width: '85%', 
        // backgroundColor: 'red',  
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', 
    },
  }) 

export default BeerCollection;