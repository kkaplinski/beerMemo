import * as actionTypes from '../actions/actionTypes'

initialState = {
    selectedMenu: 'asd'
}

const reducer = (state = initialState, action) => { 

    switch(action.type) {
        case actionTypes.SELECTED_MENU_OPTIONS:
            return {
                ...state,
                selectedMenu: action.selectedMenu
            }  
        default: 
            return {
                state
            }
    }

}

export default reducer