import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {View,StyleSheet,} from 'react-native';
import { Navigation } from "react-native-navigation";
import DefaultText from '../../Components/UI/DefaultText/DefaultText';
import AnimatedObject from '../../Components/UI/AnimatedObject/AnimatedObject';
import IconM from 'react-native-vector-icons/MaterialIcons'; 

import {connect} from 'react-redux';  
import {setSelectedMenuOptions} from '../../store/actions/index'


class SideDrawer extends Component {
    state = {
        activeComponentId: '',
    }
    
    
    componentDidMount() {
        this.screenEventListener = Navigation.events().registerComponentDidAppearListener( ( { componentId } ) => {
            if (componentId === 'YourBeerList' || componentId === 'AddNewBeer') {
                this.setState({
                    activeComponentId: componentId
                })
            } 
        }) 
      } 
    
    componentWillUnmount() {
        if (this.screenEventListener) {
            this.screenEventListener.remove();
          }
    }   
 
    goToMenuOptions = (optionMenu) => {  
        if(optionMenu === 'About' && this.props.selectedMenu) {
            Navigation.pop('UsedLibraries')
        } else if (optionMenu === 'UsedLibraries' && this.props.selectedMenu) {   
            Navigation.pop('About')   
        }
        Icon.getImageSource( 'arrow-left', 25, 'grey') 
        .then( (source) => { 
            this.props.onSetSelectedMenuOptions(optionMenu)
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {   
                        visible: false  
                    }
                }
            });
            Navigation.push(this.state.activeComponentId, {  
                component: {
                    id: optionMenu,
                    name: `navigation.playground.${optionMenu}`,  
                    passProps: {
                        iconLeft: { uri: source.uri },
                    }, 
                },
            });             
        })
       
    }
    

    render() {
        
        return (
            <View style = {styles.menuContainer}>
                <AnimatedObject disabled = {this.props.selectedMenu === 'About'} onPress = {() => this.goToMenuOptions('About')}>
                    <View style = {[styles.menuOptions, {backgroundColor: this.props.selectedMenu === 'About' ? '#c3c3c7' : null}]}>
                        <IconM  
                            style = {{marginRight: 10}} 
                            color = '#454545'
                            name ='info' size = {24} /> 
                        <DefaultText
                            fontSize = {16}
                            fontWeight = '400'
                            >   
                            About 
                        </DefaultText>
                    </View>
                </AnimatedObject>             
                <AnimatedObject disabled = {this.props.selectedMenu === 'UsedLibraries'} onPress = {() => this.goToMenuOptions('UsedLibraries')}>
                    <View  style = {[styles.menuOptions, {backgroundColor: this.props.selectedMenu === 'UsedLibraries' ? '#c3c3c7' : null}]}>
                        <IconM  
                            style = {{marginRight: 10}} 
                            color = '#454545'
                            name ='book' size = {24} /> 
                        <DefaultText
                            fontSize = {16}
                            fontWeight = '400'
                            >   
                            Used Libraries
                        </DefaultText>
                    </View>
                </AnimatedObject>             
            </View>
        );

    }

}
const styles = StyleSheet.create({
    menuContainer: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#e1dddc'
    },
    menuOptions: { 
        padding: 20,  
        flexDirection: 'row',
        alignItems: 'center'
    }
})

const mapStateToProps = state => {
    return {
        selectedMenu: state.ui.selectedMenu
    }  
  }      
  
  const mapDispatchToProps = dispatch => { 
    return {
        onSetSelectedMenuOptions: (menuOption) => dispatch(setSelectedMenuOptions(menuOption)),
       
    }
  }        
  
  export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);