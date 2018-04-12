export const SAVE_INPUT_DATA = 'SAVE_INPUT_DATA';
export const SAVE_VERIFY_INPUT_DATA = 'SAVE_VERIFY_INPUT_DATA';
export const SAVE_CONFIRMATION_INPUT_DATA = 'SAVE_CONFIRMATION_INPUT_DATA';

export const saveInputData = (inputedData) => ({
    type: SAVE_INPUT_DATA,
    inputedData
});

export const saveVerfyInputData = (inputedData) => ({
    type: SAVE_VERIFY_INPUT_DATA,
    inputedData
});

export const saveConfirmationInputData = (inputedData) => ({
    type: SAVE_CONFIRMATION_INPUT_DATA,
    inputedData
});
