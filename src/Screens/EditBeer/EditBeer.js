import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Navigation } from "react-native-navigation";
import {connect} from 'react-redux';  
import {getBeerCollection} from '../../store/actions/index';

import BeerInputControls from '../../Components/BeerInputControls/BeerInputControls';

class EditBeer extends Component { 
    static options(passProps) {
        return {
          topBar: {
            leftButtons: [
              {
                id: 'buttonOne',
                icon: passProps.leftIcon, 
              }
            ],
            title: {
              text: 'Edit Beer',
              color: '#474749'
            },
            drawBehind: false,  
            visible: true,  
            animate: false,
            background: {
                color:  '#ffb927'
            } 
          }, 
          layout: {
            direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
            backgroundColor: '#e1dddc',
            orientation: ['portrait'] // An array of supported orientations  
          },
        }; 
      } 

       
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }

    componentDidAppear() {
      this.bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(({ selectedTabIndex, unselectedTabIndex }) => {
        Navigation.popTo('YourBeerList'); 
      });
    }
    
    componentDidDisappear() {
      this.bottomTabEventListener.remove();
    }
      
    
    navigationButtonPressed({buttonId}) { 
        if(buttonId === 'buttonOne') {
            Navigation.pop(this.props.componentId);
        }   
    }

    render() {
        
        return (
            <ScrollView contentContainerStyle={{flexGrow:1}}>
            <View style = {styles.container}> 
                <BeerInputControls onUpdateState = {this.props.onGetBeerCollection} componentEditId = {this.props.componentId} beerData = {this.props.beerData}/> 
            </View> 
          </ScrollView>
        );

    }

}

const styles = StyleSheet.create({
    container: {      
        // backgroundColor: 'yellow',   
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,  
        paddingBottom: 15  
    },

})

const mapDispatchToProps = dispatch => { 
    return {
        onGetBeerCollection: () => dispatch(getBeerCollection()), 
    }
}       

export default connect(null, mapDispatchToProps)(EditBeer);