import * as actionTypes from '../actions/actionTypes'

initialState = {
    beerDataCollection: [],
    searchedCollection: [],
    key: null,
}

const reducer = (state = initialState, action) => { 

    switch(action.type) {
        case actionTypes.SET_BEER_COLLECTION:
            return {
                ...state,
                beerDataCollection: action.beerDataCollection,
                searchedCollection: action.beerDataCollection,
            }
        case actionTypes.SORT_BY_WORD_UP:
            let wordSortedArrayUp = [...state.beerDataCollection]
            wordSortedArrayUp.sort((a,b) => {
                if (a[action.word] < b[action.word])
                    return -1
                if (a[action.word] > b[action.word])
                    return 1
                return 0
            })
            return {     
                ...state,
                beerDataCollection: wordSortedArrayUp
            }
        case actionTypes.SORT_BY_WORD_DOWN:
            let wordSortedArrayDown = [...state.beerDataCollection] 
            wordSortedArrayDown.sort((a,b) => {
                if (a[action.word] < b[action.word])
                    return 1
                if (a[action.word] > b[action.word])   
                    return -1
                return 0
            })
            return {     
                ...state,
                beerDataCollection: wordSortedArrayDown
            }
        case actionTypes.SORT_BY_OVERALL_UP:
            let overallSortedArrayUp = [...state.beerDataCollection]
            overallSortedArrayUp.sort((a,b) => {
                return a.overall - b.overall
            })
            return {     
                ...state,
                beerDataCollection: overallSortedArrayUp
            }
        case actionTypes.SORT_BY_OVERALL_DOWN:
            let overallSortedArrayDown = [...state.beerDataCollection] 
            overallSortedArrayDown.sort((a,b) => {
                return b.overall - a.overall
            })
            return {     
                ...state,
                beerDataCollection: overallSortedArrayDown
            }
        case actionTypes.SEARCH_FOR_BEER:
            let searchedArray = [...state.searchedCollection].filter(value => {
                return value['name'].toLowerCase().includes(action.char)  || value['type'].toLowerCase().includes(action.char)  
            });
            return {     
                ...state,
                beerDataCollection: searchedArray   
            }    
        default: 
            return {
                state
            }
    }

}

export default reducer