import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';     
import DefaultText from './../../UI/DefaultText/DefaultText'; 
import LinearGradient from 'react-native-linear-gradient';
 

class BeerBottle extends Component  { 
    
    render() { 
        let textColor = 
            this.props.beerData.color === '#ffe84d' ||
            this.props.beerData.color === '#f4cc2e' || 
            this.props.beerData.color === '#f5a338' ? 'black' :  'white';  
        return (
            <View style = {styles.bottleContainer}> 
                <View style = {styles.top}></View>
                <View  style = {styles.neck}></View> 
                <LinearGradient locations = {[0.1,0.15,0.4, 0.9, 1]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#a29183','#bba591','#d6c9bd','#d6c9bd', 'white']}    style = {[styles.body]}>       
                    <LinearGradient locations = {[0.1, 0.2, 0.9, 1]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.1)',this.props.beerData.color || '#c5c1c1', 'rgba(255,255, 255, 0.6)'  ]} style = {[styles.labelInfo, {backgroundColor: this.props.beerData.color}]}>
                  
                        <DefaultText  
                        color = {textColor}       
                        fontWeight = {'600'}   
                        fontSize = {16}
                        style = {{textAlign: 'center' }} >      
                            {this.props.beerData.name}
                        </DefaultText> 

                        <DefaultText
                        color = {textColor}   
                        fontSize = {14}> 
                            {this.props.beerData.type}
                        </DefaultText>

                        <View style = {styles.alcoBlg}>
                            <DefaultText
                            color = {textColor}>                  
                                {this.props.beerData.blg === 0 ? 'N/A' : this.props.beerData.blg.toFixed(1) + '°Blg'}
                            </DefaultText>
                            <DefaultText color = {textColor}>
                                {this.props.beerData.alco.toFixed(1)}% ABV
                            </DefaultText>
                        </View> 

                    </LinearGradient>
                </LinearGradient>     
            </View>
        );
    }
    

}
const styles = StyleSheet.create({
    bottleContainer: { 
        // backgroundColor: 'red',   
        width: '40%',   
        height: '100%',  
        alignItems: 'center', 
        justifyContent: 'center', 
        marginRight: 30,
        marginLeft: 30,   
    },
    neck: {
        width:  '50%',     
        height: 0,    
        borderLeftWidth: 15, 
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderRightWidth: 15,
        borderBottomWidth: 130,
        borderBottomColor: '#d6c9bd'  
    },
    top: {     
        borderRadius: 10, 
        width: '35%',    
        height: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d6c9bd' ,   
         
    },  
    body: {  
        borderTopRightRadius: 42,         
        borderTopLeftRadius: 42,   
        borderBottomLeftRadius: 30, 
        borderBottomRightRadius: 30, 
        // backgroundColor: '#e5c9a7',   
        width: '100%',  
        height: '52%',   
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelInfo: {
        paddingTop: 6,
        width: '100%',    
        height: '40%',
        alignItems: 'center',   
        justifyContent: 'space-between', 
    },
    alcoBlg: {
        padding: 4,
        borderTopColor: 'white',
        borderTopWidth: 1,
        backgroundColor: 'rgba(255,255,255, 0.3)',
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    }
  }) 
   
export default BeerBottle;