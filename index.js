import { Navigation } from "react-native-navigation";
import {Provider} from 'react-redux';   
import configureStore from './src/store/configureStore';       

import AddNewBeer from './src/Screens/AddNewBeer/AddNewBeer'; 
import BeerEdit from './src/Screens/EditBeer/EditBeer'
import BeerDetail from './src/Screens/BeerDetail/BeerDetail'; 
import YourBeerList from './src/Screens/YourBeerList/YourBeerList';  
import AlertModal from './src/Screens/AlertModal/AlertModal'
import SideDrawer from "./src/Screens/Sidedrawer/Sidedrawer";
import UsedLibraries from './src/Screens/UsedLibraries/UsedLibraries';
import About from './src/Screens/About/About';
import mainTab from './src/Components/Navigations/Navigations';

import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'   
import schema from './src/model/schema'  
import Beer from "./src/model/Beer";
  
//CREATING DATABASE

const adapter = new SQLiteAdapter({
  schema,
})  


export const database = new Database({
  adapter,
  modelClasses: [
    Beer
  ],
  actionsEnabled: true,
})

export const beerCollection = database.collections.get('beers')


const store = configureStore(); 


// CREATING NAVIGATION

Navigation.registerComponentWithRedux('navigation.playground.YourBeerList', () => YourBeerList, Provider, store);
Navigation.registerComponent('navigation.playground.AddNewBeer', () => AddNewBeer); 
Navigation.registerComponentWithRedux('navigation.playground.BeerEdit', () => BeerEdit, Provider, store); 
Navigation.registerComponentWithRedux('navigation.playground.BeerDetail', () => BeerDetail, Provider, store); 
Navigation.registerComponentWithRedux('navigation.playground.AlertModal', () => AlertModal, Provider, store); 

Navigation.registerComponentWithRedux('navigation.playground.SideDrawer', () => SideDrawer, Provider, store); 
Navigation.registerComponentWithRedux('navigation.playground.UsedLibraries', () => UsedLibraries, Provider, store); 
Navigation.registerComponentWithRedux('navigation.playground.About', () => About, Provider, store); 




 
Navigation.events().registerAppLaunchedListener(() => {
          
 Navigation.setDefaultOptions({
   bottomTab: {
     selectedTextColor: '#ffb927'   
   }
 })   
 mainTab()       
});    