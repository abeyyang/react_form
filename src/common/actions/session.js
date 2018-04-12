export const SFP_LOGIN = 'SFP_LOGIN';
export const UPDATE_SESSION = 'UPDATE_SESSION';

export const sfpLogin = (session) => ({
    type: SFP_LOGIN,
    session
});

export const updateSession = (session) => ({
    type: UPDATE_SESSION,
    session
});


export const GATEWAY_LOGIN = 'GATEWAY_LOGIN';
export const GATEWAY_LOGOUT = 'GATEWAY_LOGOUT';

export const gatewayLogin = (launchParamStr) => ({
    type: GATEWAY_LOGIN,
    launchParamStr
});

export const gatewayLogout = () => ({
    type: GATEWAY_LOGOUT
});

export const CHANNEL_DATA_RECEIVED = 'CHANNEL_DATA_RECEIVED'
export const CHANNEL_DATA_LOGIN_REQUEST = 'CHANNEL_DATA_LOGIN_REQUEST'
export const CHANNEL_DATA_LOGIN_SUCCESS = 'CHANNEL_DATA_LOGIN_SUCCESS'
export const CHANNEL_DATA_LOGIN_FAILURE = 'CHANNEL_DATA_LOGIN_FAILURE'

export const channelData = {
    received: (launchChannelData) => ({
        type: CHANNEL_DATA_RECEIVED,
        launchChannelData
    }),
    loginRequest: (request) => ({
        type: CHANNEL_DATA_LOGIN_REQUEST,
        request
    }),
    loginSuccess: (request, response) => ({
        type: CHANNEL_DATA_LOGIN_SUCCESS,
        request, response
    }),
    loginFailure: (request, error) => ({
        type: CHANNEL_DATA_LOGIN_FAILURE,
        request, error
    })
}

export const SESSION_INIT_REQUEST = 'SESSION_INIT_REQUEST'
export const SESSION_INIT_SUCCESS = 'SESSION_INIT_SUCCESS'
export const SESSION_INIT_FAILURE = 'SESSION_INIT_FAILURE'
export const sfpSession = {
    request: () => ({
        type: SESSION_INIT_REQUEST
    }),
    success: () => ({
        type: SESSION_INIT_SUCCESS
    }),
    failure: () => ({
        type: SESSION_INIT_FAILURE
    })
}

export const CUSTOMER_DETAIL_REQUEST = 'CUSTOMER_DETAIL_REQUEST'
export const CUSTOMER_DETAIL_SUCCESS = 'CUSTOMER_DETAIL_SUCCESS'
export const CUSTOMER_DETAIL_FAILURE = 'CUSTOMER_DETAIL_FAILURE'
export const customerDetail = {
    request: (request) => ({
        type: CUSTOMER_DETAIL_REQUEST,
        request
    }),
    success: (request, response) => ({
        type: CUSTOMER_DETAIL_SUCCESS,
        request, response
    }),
    failure: (request, error) => ({
        type: CUSTOMER_DETAIL_FAILURE,
        request, error
    })
}


export const JOINT_CUSTOMER_DETAIL_REQUEST = 'JOINT_CUSTOMER_DETAIL_REQUEST'
export const JOINT_CUSTOMER_DETAIL_SUCCESS = 'JOINT_CUSTOMER_DETAIL_SUCCESS'
export const JOINT_CUSTOMER_DETAIL_FAILURE = 'JOINT_CUSTOMER_DETAIL_FAILURE'
export const jointCustomerDetail = {
    request: (request) => ({
        type: JOINT_CUSTOMER_DETAIL_REQUEST,
        request
    }),
    success: (request, response) => ({
        type: JOINT_CUSTOMER_DETAIL_SUCCESS,
        request, response
    }),
    failure: (request, error) => ({
        type: JOINT_CUSTOMER_DETAIL_FAILURE,
        request, error
    })
}


export const RELATED_SOLE_CUSTOMER_DETAIL_REQUEST = 'RELATED_SOLE_CUSTOMER_DETAIL_REQUEST'
export const RELATED_SOLE_CUSTOMER_DETAIL_SUCCESS = 'RELATED_SOLE_CUSTOMER_DETAIL_SUCCESS'
export const RELATED_SOLE_CUSTOMER_DETAIL_FAILURE = 'RELATED_SOLE_CUSTOMER_DETAIL_FAILURE'
export const relatedSoleCustomerDetail = {
    request: (request) => ({
        type: RELATED_SOLE_CUSTOMER_DETAIL_REQUEST,
        request
    }),
    success: (request, response) => ({
        type: RELATED_SOLE_CUSTOMER_DETAIL_SUCCESS,
        request, response
    }),
    failure: (request, error) => ({
        type: RELATED_SOLE_CUSTOMER_DETAIL_FAILURE,
        request, error
    })
}


export const CONTROL_DATA_REQUEST = 'CONTROL_DATA_REQUEST'
export const CONTROL_DATA_SUCCESS = 'CONTROL_DATA_SUCCESS'
export const CONTROL_DATA_FAILURE = 'CONTROL_DATA_FAILURE'
export const controlData = {
    request: (request) => ({
        type: CONTROL_DATA_REQUEST,
        request
    }),
    success: (request, response) => ({
        type: CONTROL_DATA_SUCCESS,
        request, response
    }),
    failure: (request, error) => ({
        type: CONTROL_DATA_FAILURE,
        request, error
    })
}
