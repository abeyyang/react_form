export const COMMON_REQUEST_BUILDER = 'COMMON_REQUEST_BUILDER';
export const COMMON_REQUEST_BUILDER_SUCCESS = 'COMMON_REQUEST_BUILDER_SUCCESS';

export const buildReqeustCommon = () => ({
    type: COMMON_REQUEST_BUILDER,
    data:""
});

export const buildReqeustCommonSuccess = () => ({
    type: COMMON_REQUEST_BUILDER_SUCCESS,
    data:""
});


