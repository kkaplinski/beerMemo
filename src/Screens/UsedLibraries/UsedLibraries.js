import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Navigation } from "react-native-navigation";
import DefaultText from '../../Components/UI/DefaultText/DefaultText';
import * as licenses from '../../utility/licenses';
import ButtonDefault from '../../Components/UI/ButtonDefault/ButtonDefault';
import {connect} from 'react-redux';  
import {setSelectedMenuOptions} from '../../store/actions/index'

class UsedLibraries extends Component { 

  state = {
    libraries: {
      react: {
        title: 'React',
        author: 'Facebook',
        license: licenses.REACT_LICENSE,
      }, 
      reactnative: {
        title: 'React Native',
        author: 'Facebook',
        license: licenses.REACT_LICENSE,
      }, 
      wix: {
        title: 'React Native Navigation',
        author: 'Wix',
        license: licenses.REACT_NATIVE_NAVIGATION_LICENSE,
      },
      redux: {
        title: 'Redux',
        author: 'Dan Abramov',
        license: licenses.REDUX_LICENSE,
      },
      reduxthunk: {
        title: 'React Redux',
        author: 'Dan Abramov',
        license: licenses.REDUX_LICENSE,
      },
      reactredux: {
        title: 'Redux Thunk',
        author: 'Dan Abramov',
        license: licenses.REDUX_LICENSE,
      },
      icons: {
        title: 'Vector Icons',
        author: 'oblador',
        license: licenses.VECTOR_ICONS_LICENSE,
      },
      slider: {
        title: 'react-native-slider',
        author: 'react-native-community',
        license: licenses.REACT_NATIVE_SLIDER_LICENSE,
      },
      gradient: {
        title: 'react-native-linear-gradient',
        author: 'react-native-community',
        license: licenses.REACT_NATIVE_LINEAR_GRADIENT_LICENSE,
      },
      watermelondb: {
        title: 'Watermelon DB',
        author: 'Nozbe, Radek Pietruszewski',
        license: licenses.WATERMELON_DB_LICENSE,
      },
      withObservables: {
        title: 'withObservables',
        author: 'Nozbe',
        license: licenses.WATERMELON_DB_LICENSE,
      },
    },
    licenseShow: false,
    selectedLib: null,
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
          text: 'Used Libraries',
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
    if(this.props.selectedMenu === 'UsedLibraries') {
      this.props.onSetSelectedMenuOptions('')
    } 

  }

  navigationButtonPressed({buttonId}) { 
      if(buttonId === 'buttonOne') {
          Navigation.pop(this.props.componentId);
      }   
  }

  
    render() {
        const listofLibraries = []
        for (let lib in this.state.libraries) {
          let textLicense;
          if (this.state.licenseShow && this.state.selectedLib === lib) {
            textLicense = <DefaultText color = 'grey' fontSize = {12}>{this.state.libraries[lib].license}</DefaultText>
          }
          listofLibraries.push(
            <View key = {lib} style = {styles.librariesContainer}>
                <View style = {styles.librariesContent}>
                  <View>
                    <DefaultText>Title: {this.state.libraries[lib].title}</DefaultText>
                    <DefaultText>Author: {this.state.libraries[lib].author}</DefaultText>
                  </View>
                  <ButtonDefault onPress = {() => this.setState({selectedLib: lib, licenseShow: !this.state.licenseShow})} textColor = {'grey'}>{`Toogle\nLicense`}</ButtonDefault>
                </View>
                {textLicense}
            </View>
          )
        }
        return (
        <ScrollView>  
          <View style = {styles.container}>
            <DefaultText>This application was created with React Native and few very helpful libraries under open source license. Here is a list of them:</DefaultText>
            {listofLibraries} 
          </View>
        </ScrollView>
        );

    }

}
const styles = StyleSheet.create({
    container: {        
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    librariesContainer: {
      flex: 1,
      marginTop: 10,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      width: '95%',
      justifyContent: 'center'
    },
    librariesContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
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

export default connect(mapStateToProps, mapDispatchToProps)(UsedLibraries);