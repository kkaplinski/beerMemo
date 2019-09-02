import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation'
import {View, ScrollView, StyleSheet} from 'react-native';
import BeerInputControls from '../../Components/BeerInputControls/BeerInputControls';

class AddNewBeer extends Component { 



	static options(passProps) {
        return {
          topBar: {  
            leftButtons: [
              {
                id: 'hamburger',
                icon: passProps.leftIcon, 
              }
            ],
            title: {
              text: 'Add New Beer',
              color: '#ffb927'
            },
            drawBehind: false,  
            visible: true,  
            animate: false,
            background: {
                color: '#474749' 
            } 
          }, 
          bottomTab: {
            selectedIconColor: '#ffb927',     
            text: 'Add New Beer',   
            icon:  passProps.bottomIcon,       
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
      
    
    navigationButtonPressed({buttonId}) { 
        if(buttonId === 'hamburger') {
          Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {   
                    visible: true

                },
            },
            
        });
      }
    }

    render() {  
        
        return (
            <ScrollView contentContainerStyle = {{flexGrow: 1}}>
              <View style = {styles.container}>  
                  <BeerInputControls/> 
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

export default AddNewBeer;