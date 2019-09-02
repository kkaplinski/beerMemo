import React, {Component} from 'react';
import { Navigation } from 'react-native-navigation';
import {connect} from 'react-redux';  
import {View, ScrollView, StyleSheet} from 'react-native';
import {getBeerCollection, sortByWordUp, sortByWordDown, sortByOverallUp, sortByOverallDown, searchForBeer } from '../../store/actions/index';
import BeerCollection from '../../Components/BeerCollection/BeerCollection';
import BeerSortPanel from '../../Components/BeerCollection/BeerSortPanel/BeerSortPanel';
 
class YourBeerList extends Component { 
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
              text: 'Your Beer Collection',
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
            text: 'Beer collection', 
            icon:  passProps.bottomIcon,        
          }
        };
      } 

      constructor(props) {
        super(props);
        Navigation.events().bindComponent(this); 
        this.beerCollectionElement = React.createRef();
      }

      navigationButtonPressed({buttonId}) { 
        if(buttonId === 'hamburger') {
          Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {   
                    visible: true
                }
            }
        });
      }
    }

      
      
      componentDidAppear() {
        this.beerCollectionElement.current.resetSelectedBeer(); 
        this.props.onGetBeerCollection(); 

      }  


    render() {
        return (
          <View style = {styles.container}>
            <BeerSortPanel
                onSearchChange = {(char) => {this.props.onSearchForBeer(char)}}
                sortByNameUp = {() => this.props.onSortByWordUp('name')}
                sortByNameDown = {() => this.props.onSortByWordDown('name')} 
                sortByTypeUp = {() => this.props.onSortByWordUp('type')}
                sortByTypeDown = {() => this.props.onSortByWordDown('type')}  
                sortByOverallUp = {() => this.props.onSortByOverallUp()} 
                sortByOverallDown = {() => this.props.onSortByOverallDown()} 
                />
            <ScrollView style={{width: "100%"}} contentContainerStyle = {{flexGrow: 1}}>
              <View style = {styles.listContainer}>
                  <BeerCollection ref = {this.beerCollectionElement} beerData = {this.props.beers} componentId = {this.props.componentId}/>
              </View> 
            </ScrollView>
          </View>
         
        );  
 
    }

} 

const styles = StyleSheet.create({ 
  container: { 
      flex: 1,  
      alignItems: 'center',
      justifyContent: 'center',  
      paddingTop: 20 
  },
  listContainer: {
      flex: 1,  
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
  }
}) 


const mapStateToProps = state => {
    return {
        beers: state.beers.beerDataCollection
    }  
}      

const mapDispatchToProps = dispatch => { 
    return {
        onGetBeerCollection: () => dispatch(getBeerCollection()),
        onSortByWordUp: (word) => dispatch(sortByWordUp(word)),
        onSortByWordDown: (word) => dispatch(sortByWordDown(word)),
        onSortByOverallUp: () => dispatch(sortByOverallUp()),
        onSortByOverallDown: () => dispatch(sortByOverallDown()),
        onSearchForBeer: (char) => dispatch(searchForBeer(char)),
    }
}        

export default connect(mapStateToProps, mapDispatchToProps)(YourBeerList);