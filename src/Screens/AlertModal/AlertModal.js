import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux';  
import {deleteFromCollection} from '../../store/actions/index';
import ButtonDefault from '../../Components/UI/ButtonDefault/ButtonDefault';
import DefaultText from '../../Components/UI/DefaultText/DefaultText';
import { Navigation } from 'react-native-navigation';

class alertModal extends Component { 
    static options(passProps) {
        return {
          topBar: {
            visible: false,
            animate: true,
          }, 
          screenBackgroundColor: 'transparent',
          modalPresentationStyle: 'overCurrentContext',
        };    
      }  

    

      saveHandler = () => {
        if(this.props.componentEditId) {
          Navigation.pop(this.props.componentEditId)
        }
        Navigation.dismissModal(this.props.componentId)
      }

      deleteHandler = () => { 
            this.props.onDeleteFromCollection(this.props.beerDataId, this.props.componentId, this.props.componentDetailID);

      }

    render() {
        let button;
        if (this.props.beerDataId) {
            button = <ButtonDefault flex = {0.47}    color = '#ea4335' onPress = {this.deleteHandler}>Delete</ButtonDefault>
        }
        return (
            <View style = {styles.container}>
                <View style = {styles.alert}>
                    <DefaultText fontSize = {16} style = {{textAlign: 'center', marginBottom: 15}}>{this.props.text}</DefaultText>
                    <View style = {[styles.buttons, {justifyContent: !this.props.beerDataId ?'center': 'space-between'} ]}>
                        <ButtonDefault flex = {0.47}   color = '#34a853' onPress = {this.saveHandler}>{this.props.buttonText}</ButtonDefault>
                        {button}
                    </View>   
                </View>
            </View> 
        );  

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',  
        alignItems: 'center',
        justifyContent: 'center',
    },
    alert: { 
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: '70%'
    },
    buttons: {
        width: '100%',
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',

    }
})

const mapDispatchToProps = dispatch => { 
    return {
        onDeleteFromCollection: (beerDataId, modalID, detailID) => dispatch(deleteFromCollection(beerDataId, modalID, detailID)), 
    }       
}

export default connect(null, mapDispatchToProps)(alertModal);