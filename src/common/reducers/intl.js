import {
    CHANGE_LOCALE,
    CHANGE_LOCALE_LONG,
    CHANGE_MESSAGES
} from '../actions/intl';

import { DEFAULT_LONG_LOCALE, NLS } from '../../locale/constant';

const initialState = {
    locale: NLS[DEFAULT_LONG_LOCALE].locale,
    localeLong: DEFAULT_LONG_LOCALE,
    messages: NLS[DEFAULT_LONG_LOCALE].msg
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOCALE:
            return { ...state, locale: action.locale };
        case CHANGE_LOCALE_LONG:
            return { ...state, localeLong: action.localeLong };
        case CHANGE_MESSAGES:
            return { ...state, messages: action.messages };
        default:
            return state;
    }
};

export default reducer;
