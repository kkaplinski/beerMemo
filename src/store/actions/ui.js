import {SELECTED_MENU_OPTIONS} from './actionTypes'



export const setSelectedMenuOptions = selectedMenu => {
    return {
        type: SELECTED_MENU_OPTIONS,
        selectedMenu: selectedMenu
    }
}