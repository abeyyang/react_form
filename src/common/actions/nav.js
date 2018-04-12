export const UPDATE_STICKY_HEIGHT = 'UPDATE_STICKY_HEIGHT';
export const UPDATE_NAV_CHILDREN = 'UPDATE_NAV_CHILDREN';
export const UPDATE_ERROR_INFO = 'UPDATE_ERROR_INFO';
export const UPDATE_MESSAGE_BOX = 'UPDATE_MESSAGE_BOX';
export const UPDATE_MESSAGE_BOX_DONE = 'UPDATE_MESSAGE_BOX_DONE';
export const CLEAN_ALL_ERROR_INFO = 'CLEAN_ALL_ERROR_INFO';
export const COMMON_VALIDATE = 'COMMON_VALIDATE';
export const COMMON_RESPONSE_VALIDATE = 'COMMON_RESPONSE_VALIDATE';
export const REST_RESPONSE_VALIDATE = 'REST_RESPONSE_VALIDATE';
export const COMPONENT_LOADING = 'COMPONENT_LOADING';
export const updateStickyHeight = (height) => ({
    type: UPDATE_STICKY_HEIGHT,
    height
});

export const updateNavChildren = (children) => ({
    type: UPDATE_NAV_CHILDREN,
    children
});

export const cleanError = () => ({
    type: CLEAN_ALL_ERROR_INFO
});

export const commonValidate = (validateList,validatePage) => ({
    type: COMMON_VALIDATE,
    validateList:validateList,
    validatePage:validatePage
});

export const NAVIGATE = 'NAVIGATE'
export const navigate = (targetDesc, params) => ({
    type: NAVIGATE,
    targetDesc, params
});


export const componentLoading = (componentName, toggle) => ({
    type: COMPONENT_LOADING,
    componentName : componentName,
    toggle: toggle
});
