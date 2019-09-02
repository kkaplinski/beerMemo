import {SEARCH_FOR_BEER, SET_BEER_COLLECTION, SORT_BY_WORD_UP, SORT_BY_WORD_DOWN, SORT_BY_OVERALL_UP, SORT_BY_OVERALL_DOWN } from "./actionTypes";
import {Navigation} from 'react-native-navigation';
import {beerCollection, database} from '../../../index';

 
export const setBeerCollection = beerDataCollection => {
    return {
        type: SET_BEER_COLLECTION,
        beerDataCollection: beerDataCollection
    }
}

export const searchForBeer = (char) => {
    return {
        type: SEARCH_FOR_BEER,
        char: char
    }
}
export const sortByWordUp = (word) => {
    return {
        type: SORT_BY_WORD_UP,
        word: word
    }
}
export const sortByWordDown = (word) => {
    return {
        type: SORT_BY_WORD_DOWN,      
        word: word

    }
}
export const sortByOverallUp = () => {
    return {
        type: SORT_BY_OVERALL_UP,
    }
}
export const sortByOverallDown = () => {
    return {
        type: SORT_BY_OVERALL_DOWN,  
    } 
}

export const deleteFromCollection = (beerDataId, modalID, detailID) => {
    return async dispatch => {
        try {
            await beerCollection.find(beerDataId)
            .then(async (beer) => {
                await database.action(async () => {
                    await beer.destroyPermanently()
                    Navigation.pop(detailID);    
                    Navigation.dismissModal(modalID);
                })
            })
        } catch (err) {
           alert('Something went wrong with deleting your beer', err)     
        }
    }
}
 
export const  getBeerCollection = () => {
    return async dispatch => {
        try {
            const allBeers = await beerCollection.query().fetch()
            console.log(allBeers)
            dispatch(setBeerCollection(allBeers))
        } catch (err) {
           alert('Something went wrong with getting your beer collection')     
        }

    }
}      