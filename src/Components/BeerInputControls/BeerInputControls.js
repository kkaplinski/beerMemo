import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native'; 
import {Navigation} from 'react-native-navigation';
import {database, beerCollection} from '../../../index';
import Slider from '@react-native-community/slider';    
import DefaultInput from '../../Components/UI/DefaultInput/DefaultInput';
import AnimatedIcon from '../UI/AnimatedIcon/AnimatedIcon';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonDefault from '../UI/ButtonDefault/ButtonDefault';
import DefaultText from '../UI/DefaultText/DefaultText';
import validation from './../../utility/validation'; 

 


class BeerInputControls extends Component {    
    state = {
        isLoading: false,
        editMode: false,
        controls: {
            name: {
                value: null,
                valid: false,
                validationRules: {
                    minLength: 4
                },
                touched: false
            },
            type: {
                value: null,
                valid: false,
                validationRules: {
                    minLength: 3
                },
                touched: false
            },
            blg: {
                minValue: 0,
                maxValue: 25,
                value:  10
            },
            alco: {
                minValue: 0,
                maxValue: 15,
                value: 5.6
            },
            smell:  {
                value: null
            },
            color: {
                arrayofColor: ['#ffe84d' , '#f4cc2e', '#f5a338', '#e45e29', '#761618', '#511c0a', '#261412'],
                value: null,        
            },
            taste:  {
                value: null 
            },
            bitter:  {
                value: null
            },
            overall:  {
                value: null
            },
            addInfo: {
                value: null,
            }
        },
    }    
    componentDidMount = () => {
        if(this.props.beerData) {
            for (let key in this.props.beerData) {
                this.setState(prevState => {
                    return {
                        editMode: true,
                        controls: { 
                            ...prevState.controls,
                            [key]: {
                                ...prevState.controls[key],   
                                value: this.props.beerData[key],
                                valid: true 
                            }
                        }
                    }  
                })
            }
        }
    }
  
    // STORING BEERS IN COLLECTION
    submitHandler =  () => {
        this.setState({isLoading: true})
        try {
            database.action(async () => {
                if(this.state.editMode) {
                    const beer = await beerCollection.find(this.props.beerData.id);
                    await beer.update(post => {
                        beer.name = this.state.controls.name.value,
                        beer.type = this.state.controls.type.value,
                        beer.blg = this.state.controls.blg.value,
                        beer.alco = this.state.controls.alco.value,  
                        beer.smell = this.state.controls.smell.value,
                        beer.color = this.state.controls.color.value,
                        beer.taste = this.state.controls.taste.value,  
                        beer.bitter = this.state.controls.bitter.value,
                        beer.overall = this.state.controls.overall.value, 
                        beer.addInfo = this.state.controls.addInfo.value  
                      })
                } else {
                    const newBeer = await  beerCollection.create(beer => {
                        beer.name = this.state.controls.name.value,
                        beer.type = this.state.controls.type.value,
                        beer.blg = this.state.controls.blg.value,
                        beer.alco = this.state.controls.alco.value,  
                        beer.smell = this.state.controls.smell.value,
                        beer.color = this.state.controls.color.value,
                        beer.taste = this.state.controls.taste.value,  
                        beer.bitter = this.state.controls.bitter.value,
                        beer.overall = this.state.controls.overall.value, 
                        beer.addInfo = this.state.controls.addInfo.value           
                    })
                }
              })
              .then( () => {
                    if(this.props.onUpdateState) {
                        this.props.onUpdateState()  //Making sure that after pop of the Edit screen, Detail screen will be updated by Redux
                    }   
                    let text = this.state.editMode ? 'Update complated' : 'Your beer was succesfully added to collection'
                    Navigation.showModal({
                        component: {
                            name: 'navigation.playground.AlertModal',
                            passProps: {
                                text: text,
                                buttonText: 'OK!',
                                componentEditId: this.props.componentEditId
                            },
                        }
                    });   
                this.clearControls(this.state.controls)
                this.setState({isLoading: false})
                })   
        }
        catch (err) {
            alert('There was an error saving the product')
        }

    }
    cancelHandler = () => {
        if(this.state.editMode) {
            Navigation.pop(this.props.componentEditId)
        }
        this.clearControls(this.state.controls)           
    }

    clearControls = (beerData) => {
        for (let key in beerData) { 
            if (key === 'blg' || key === 'alco') {
                this.updateInputHandler(key, 1) 

            } else {
                this.updateInputHandler(key, null)
            }
        }
    }
    
    updateInputHandler = (key, val) => {  
        this.setState(prevState => {
            return {
                controls: { 
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],   
                        value: val,
                        valid: validation(val, prevState.controls[key].validationRules),
                        touched: !val ? false : true       
                    }
                }
            }  
        })
    }  

    sliderInputChangeHandler = (key, value) => {
        clearTimeout(this.sliderTimeoutId)
        this.sliderTimeoutId = setTimeout(() => {  
          this.updateInputHandler(key, value) 
        }, 20)          
      }

   

    render() { 
            let saveButton = 
                <ButtonDefault      
                disabled = {!this.state.controls.name.valid || !this.state.controls.type.valid}
                font = {16}
                color = '#34a853'
                flex = {0.48}
                onPress = {this.submitHandler}
                >{this.state.editMode ? 'Update' : 'Save'}</ButtonDefault>
            if (this.state.isLoading) { 
                saveButton = <View flex = {0.48}>
                                <ActivityIndicator flex = {0.48} size = "large"/>   
                            </View>
            }
            const starProperties = {
                'taste': [],
                'bitter': [],
                'smell': [],  
                'overall': []
            }     
            for (let property in starProperties) {  
                for (let i = 1; i < 11; i++) {      
                    starProperties[property].push(                 
                        <AnimatedIcon 
                            key = {i}
                            name="star" 
                            color = {this.state.controls[property].value < i ? '#bbbbbb' : '#ffb927'}  
                            size = {24}       
                            onPress = {() => this.updateInputHandler(property, i)}  
                        />)   
                } 
            }   
            const colorButtons = [] 
            for (let i = 0; i < 7; i++) {        
                colorButtons.push(                  
                    <ButtonDefault  
                    key = {i} 
                    style = {[styles.colorButton, {borderWidth: 2,  borderColor: this.state.controls.color.arrayofColor[i] === this.state.controls.color.value ? 'black' :  'white' }]}  
                    color = {this.state.controls.color.arrayofColor[i]} 
                    disabled = {false}
                    onPress = {() => this.updateInputHandler('color', this.state.controls.color.arrayofColor[i])}  
                    />
                    )   
            } 
              
            
        return (   
            <View style = {styles.container}>

                    <View style = {styles.colorContainer}>       
                        <Icon 
                        borderWidth = {1} 
                        color = {this.state.controls.color.value || '#c5c1c1'}   
                        name ='beer' size = {50} />    
                        <View style = {styles.colorButtons}>
                            {colorButtons}  
                        </View>
                    </View>

                    <DefaultInput
                    valid = {this.state.controls.name.valid}
                    touched = {this.state.controls.name.touched}
                    value = {this.state.controls.name.value}
                    onChangeText = {(val) => this.updateInputHandler('name', val)}
                    placeholder = 'Beer Name'/> 

                    <DefaultInput
                    valid = {this.state.controls.type.valid}
                    touched = {this.state.controls.type.touched}
                    value = {this.state.controls.type.value} 
                    onChangeText = {(val) => this.updateInputHandler('type', val)}
                    placeholder = 'Beer Type'/>

                    <View style = {styles.sliderControls}>
                        <View style = {styles.sliderContainer}>
                            <AnimatedIcon 
                                name='remove-circle'        
                                size = {30}      
                                onPress = {() => this.updateInputHandler('blg', this.state.controls.blg.value - 0.1)}  
                            />  
                            <Slider
                                style={styles.slider} 
                                step={0.01}  
                                minimumValue={this.state.controls.blg.minValue}  
                                maximumValue={this.state.controls.blg.maxValue}
                                value={this.state.controls.blg.value}
                                onValueChange={(val) => this.sliderInputChangeHandler('blg', val)}
                                thumbTintColor='#474749'
                                maximumTrackTintColor='#474749'     
                                minimumTrackTintColor='#474749'    
                            />
                            <AnimatedIcon 
                                name='add-circle'        
                                size = {30}       
                                onPress = {() => this.updateInputHandler('blg', this.state.controls.blg.value + 0.1)}  
                            />
                        </View>   
                        <DefaultText >
                            {this.state.controls.blg.value === 0 ? 'N/A' : this.state.controls.blg.value.toFixed(1) + '°Blg'}
                        </DefaultText>
                     </View>

                    <View style = {styles.sliderControls}>  
                        <View style = {styles.sliderContainer}>
                            <AnimatedIcon 
                                name='remove-circle'
                                size = {30}     
                                onPress = {() => this.updateInputHandler('alco', this.state.controls.alco.value - 0.1)}   
                            /> 
                            <Slider  
                                style= {styles.slider} 
                                step={0.01}  
                                minimumValue={this.state.controls.alco.minValue}  
                                maximumValue={this.state.controls.alco.maxValue}
                                value={this.state.controls.alco.value}
                                onValueChange={(val) => this.sliderInputChangeHandler('alco', val)}
                                thumbTintColor='#474749'
                                maximumTrackTintColor='#474749'
                                minimumTrackTintColor='#474749'    
                            />
                            <AnimatedIcon 
                                name='add-circle'        
                                size = {30}         
                                onPress = {() => this.updateInputHandler('alco', this.state.controls.alco.value + 0.1)}  
                            />
                        </View>
                        <DefaultText >
                            {this.state.controls.alco.value.toFixed(1)}% ABV
                        </DefaultText>
                     </View>

                     <View style = {styles.stars}>  
                        <DefaultText>Taste</DefaultText>
                        <View style = {styles.star}> 
                            {starProperties.taste}  
                        </View>   
                     </View>

                     <View style = {styles.stars}>  
                        <DefaultText>Bitter</DefaultText>
                        <View style = {styles.star}> 
                            {starProperties.bitter}  
                        </View>   
                     </View>

                     <View style = {styles.stars}>  
                        <DefaultText>Smell</DefaultText>
                        <View style = {styles.star}> 
                            {starProperties.smell}  
                        </View>   
                     </View>

                     <View style = {styles.stars}>  
                        <DefaultText>Overall</DefaultText>
                        <View style = {styles.star}> 
                            {starProperties.overall}  
                        </View>   
                     </View>  

                     <DefaultInput
                        style = {{borderRadius: 15}}
                        value = {this.state.controls.addInfo.value}
                        onChangeText = {(val) => this.updateInputHandler('addInfo', val)} 
                        placeholder = 'Additional info'    
                        multiline = {true}
                        numberOfLines = {3}
                    />  
 
                    <View style = {styles.submitButtons}>
                        {saveButton}
                        <ButtonDefault
                        font = {16}                        
                        flex = {0.48}
                        color = '#ea4335'
                        onPress = {this.cancelHandler} 
                        >Cancel</ButtonDefault> 
                    </View>
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
        justifyContent: 'space-between', 
    },
    colorContainer: {
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'  
    },
    sliderControls: {   
        width: '100%',
        alignItems: 'center' 
    },
    sliderContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    slider: {
        transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
        width: '62%', 
    },
    stars: {
        marginTop: 10,  
        width: '100%',   
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    star: {
        width: '84%',   
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    colorButtons: {
        // backgroundColor: 'red',     
        width: '85%',    
        flexWrap: 'wrap', 
        flexDirection: 'row',   
        alignItems: 'center' ,
        justifyContent: 'flex-end'

    },
    colorButton: {  
        marginLeft: 5,  
        width: 30, 
        height: 30
    },
    submitButtons: {
        flexDirection: 'row' ,
        justifyContent: 'space-between',   
        width: '100%',
        alignItems: 'center',    
        marginTop: 10,
        // backgroundColor: 'yellow',
    },
})

export default BeerInputControls;