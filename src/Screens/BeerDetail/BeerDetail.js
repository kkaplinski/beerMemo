import React, {Component} from 'react';
import { Navigation } from "react-native-navigation";
import {connect} from 'react-redux';  
import {View, StyleSheet } from 'react-native'; 
import BeerDetailItem from '../../Components/BeerDetailItem/BeerDetailItem';

 
class BeerDetail extends Component { 

    static options(passProps) {
        return {
          topBar: {
            leftButtons: [
                {
                  id: 'buttonOne',
                  icon: passProps.iconLeft, 
                }
              ],
            rightButtons: [
                {
                  id: 'buttonTwo',
                  icon: passProps.iconRight,
                }
              ],
            title: { 
              text: passProps.title,
              color: '#ffb927' 
            },
            drawBehind: false, 
            visible: true,
            animate: false,
            background: {
                color: '#474749'
            },
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
        else if (buttonId === 'buttonTwo') {
            this.deleteHandler()        
        } 
    }

    deleteHandler = () => {  
      Navigation.showModal({
        component: {
            name: 'navigation.playground.AlertModal',
            passProps: {
                text: 'Do you really want to delete your beermemo?',
                componentDetailID: this.props.componentId,
                beerDataId: this.props.beerDataId,
                buttonText: 'Return',
            },
        }
      });
    }

    render() {
        let beerDetailItem;
        const beerData = this.props.beers.filter(obj => {
            return obj.id === this.props.beerDataId
        });
        if (beerData != '') {
          beerDetailItem = <BeerDetailItem componentId = {this.props.componentId} iconLeft = {this.props.iconLeft} beerData = {beerData[0]} />  
        }
          

        // Finding the right beer from state by unique ID 
        return (
          
            <View style = {styles.container}>     
                    {beerDetailItem}
            </View>  
        );  

    }

}

const styles = StyleSheet.create({ 
    container: { 
        width: '100%',  
        backgroundColor: '#e1dddc',      
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', 
    },
}) 



const mapStateToProps = state => {
  return {
      beers: state.beers.beerDataCollection
  }  
}      

export default connect(mapStateToProps)(BeerDetail);