export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export const CHANGE_LOCALE_LONG = 'CHANGE_LOCALE_LONG';
export const CHANGE_MESSAGES = 'CHANGE_MESSAGES';

export const changeLocale = (locale) => ({
    type: CHANGE_LOCALE,
    locale
});

export const changeLocaleLong = (localeLong) => ({
    type: CHANGE_LOCALE_LONG,
    localeLong
});

export const changeMessages = (messages) => ({
    type: CHANGE_MESSAGES,
    messages
});
