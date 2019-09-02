import React, {Component} from 'react';
import {View, StyleSheet, Image, Linking, Clipboard} from 'react-native';
import AnimatedIcon from '../../Components/UI/AnimatedIcon/AnimatedIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Navigation } from "react-native-navigation";
import DefaultText from '../../Components/UI/DefaultText/DefaultText';
import {connect} from 'react-redux';  
import {setSelectedMenuOptions} from '../../store/actions/index'

class About extends Component { 

    state = {
        about: 
        `
        What is most annoying for me in a present  world, that most apps, even simple one, requiring creating accounts. Sometimes you just want to stay offline and keep your data in your pocket. You want to limit your presence in online world and I understand that. 
        
        I created this app to help you memorize your favourite beers: to list them, rate them, sort them and edit them if you need. My main task was to create fast app in a nutshell. There is no 'no-needed' function, there is no online presence, just your own private 'beerbook'. One click on an icon launcher and you are ready to ADD your first beer !
        `
    }


  static options(passProps) {
    return {
      topBar: {
        leftButtons: [
            {
              id: 'buttonOne',
              icon: passProps.iconLeft, 
            }
          ],
        title: { 
          text: 'About',
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

  componentDidMount() {
    this.bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(({ selectedTabIndex, unselectedTabIndex }) => {
      if((selectedTabIndex === 1 && this.props.activeComponentId === 'AddNewBeer') || unselectedTabIndex === 0) { // prevent from poping wrong stack
        Navigation.popTo('AddNewBeer'); 
      } else {
        Navigation.popTo('YourBeerList'); 
      }
    });
  }
  
  componentDidDisappear() {
    this.bottomTabEventListener.remove();
    if(this.props.selectedMenu === 'About') {
      this.props.onSetSelectedMenuOptions('')
    } 
  }
  

  navigationButtonPressed({buttonId}) { 
      if(buttonId === 'buttonOne') {
          Navigation.pop(this.props.componentId);
      }   
  }

  
    render() {
        return (
            <View style = {styles.container}>
              <View style = {styles.text}>
                <DefaultText fontSize = {20}>Hi, Kylo Here !</DefaultText>
                <DefaultText>
                {this.state.about}
                </DefaultText>
              </View>
              <Image style={{width: 80, height: 80, marginBottom: 20}} source = {require('../../assets/ic_launcher-web.png')}/>
              <View style = {styles.contactContainer}>
                  <DefaultText fontWeight = 'bold'> 
                    If you need more information, please contact me via email, or visit my github page!
                  </DefaultText>
                  <View style = {styles.contactItem}>
                    <View style = {{flexDirection: 'row'}}>
                      <Icon
                      style = {{marginRight: 5}}
                      size = {18}
                      name = 'email'/>
                      <DefaultText>kkaplinskii@gmail.com</DefaultText>
                    </View>
                    <AnimatedIcon onPress = {() => Clipboard.setString('kkaplinskii@gmail.com')} color = 'grey' name = 'filter-none' size = {18}/>
                  </View>
                  <View style = {styles.contactItem}>
                    <View style = {{flexDirection: 'row'}}> 
                      <Icon
                      style = {{marginRight: 5}}
                      size = {18}
                      name = 'account-circle'/>
                      <DefaultText onPress={ ()=>{ Linking.openURL('https://github.com/kkaplinski')}}>https://github.com/kkaplinski</DefaultText>
                    </View>
                    <AnimatedIcon onPress = {() => Clipboard.setString('https://github.com/kkaplinski')}  color = 'grey' name = 'filter-none' size = {18}/>
                  </View>
              </View>
          </View>
        )
    } 

}
const styles = StyleSheet.create({
    container: {        
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15 
    },
    text: {
      width: '90%'
    },
    contactContainer: { 
      width: '90%',
      paddingTop: 10,
      borderTopColor: 'grey',
      borderTopWidth: 1,
    },
    contactItem: { 
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(About);