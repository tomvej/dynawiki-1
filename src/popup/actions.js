import {NAME} from './constants'

export const SHOW_POPUP = `${NAME}/show-popup`;

export const HIDE_POPUP = `${NAME}/hide-popup`;

export const showPopup = (key) => ({
    type: SHOW_POPUP,
    payload: key
});

export const hidePopup = () => ({
    type: HIDE_POPUP
});
