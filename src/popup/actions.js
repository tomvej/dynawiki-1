import {NAME} from './constants';

export const SHOW_POPUP = `${NAME}/show-popup`;

export const HIDE_POPUP = `${NAME}/hide-popup`;

const showPopupInternal = (key, x, y) => ({
    type: SHOW_POPUP,
    payload: {key, x, y},
});

export const showPopup = (key, mouseEvent) => showPopupInternal(key, mouseEvent.clientX, mouseEvent.clientY);

export const hidePopup = () => ({
    type: HIDE_POPUP,
});
