import 'whatwg-fetch';

const API_HOST = CONFIG.API_HOST;

let DEFAULT_HEADERS = {
    pragma: 'no-cache',
    'cache-control': 'no-cache',
    'X-HSBC-Channel-Id': 'MOBILE',
    'X-HSBC-Chnl-CountryCode': 'HK',
    'X-HSBC-Chnl-Group-Member': 'HBAP',
    'X-HSBC-Locale': 'en',
    'client_id': 'ee9040e831104176863fe594b0cc600b',
    'client_secret': 'cfd8728597e24427BA44EA29EF93BCE0'
};

if (CONFIG.USE_INTERNAL_API) {
    DEFAULT_HEADERS = {
        // pragma: 'no-cache',
        // 'cache-control': 'no-cache',
        'X-HSBC-Locale': 'en',
        'X-HSBC-Chnl-CountryCode': 'HK',
        'X-HSBC-Channel-Id': 'OHI',
        'X-HSBC-Chnl-Group-Member': 'HBAP'
    };
}

const buildQueryString = (params) => {
    const result = [];
    const arraybracket = /\[]$/;
    const isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    const add = function (key, value) {
        let val = value;
        if (typeof value === 'function') {
            val = value();
        } else if (value === null || value === undefined) {
            val = '';
        }
        result[result.length] = `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
    };
    const buildParams = function (prefix, obj) {
        if (prefix) {
            if (isArray(obj)) {
                for (let cur = 0, len = obj.length; cur < len; cur++) {
                    if (arraybracket.test(prefix)) {
                        add(prefix, obj[cur]);
                    } else {
                        buildParams(`${prefix}[${(typeof obj[cur] === 'object' ? cur : '')}]`, obj[cur]);
                    }
                }
            } else if (obj && String(obj) === '[object Object]') {
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        buildParams(`${prefix}[${key}]`, obj[key]);
                    }
                }
            } else {
                add(prefix, obj);
            }
        } else if (isArray(obj)) {
            for (let cur = 0, len = obj.length; cur < len; cur++) {
                add(obj[cur].name, obj[cur].value);
            }
        } else {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    buildParams(key, obj[key]);
                }
            }
        }
        return result;
    };

    return buildParams('', params).join('&').replace(/%20/g, '+');
};

const buildApiUrl = (path, params) => {
    let apiHost = API_HOST;
    if (CONFIG.USE_API_PROXY && !CONFIG.USE_INTERNAL_API) {
        apiHost = `${CONFIG.API_PROXY}/${apiHost.replace(/^https?:\/\//, '')}`;
    }
    let url;
    if (typeof path === 'string') {
        url = (path.charAt(0) === '/') ? path : `/${path}`;
        //url = `${apiHost}${url}`;
        url = `${request.host}${url}`;
    } else {
        url = `${path.host}${path.path}`;
    }
    if (params && Object.keys(params).length !== 0 && params.constructor === Object) {
        const payload = {
            body: JSON.stringify(params)
        };
        if ( url.indexOf('detailsByCriteria') > -1) {
            let requestAttribute = JSON.stringify(params.requestAttribute).replace(/\"/g, encodeURIComponent("\""));
            return `${url}?requestAttribute=${requestAttribute}`;
        }
        if ( url.indexOf('detailsByKeys') > -1) {
            let productKey = JSON.stringify(params.productKey);
            let requestAttribute = JSON.stringify(params.requestAttribute);
            return `${url}?productKey=${productKey}&requestAttribute=${requestAttribute}`;
        }
        if( url.indexOf('orders') > -1 ){
            const paramsJson = JSON.stringify(params);
            return `${url}?orderparam=${paramsJson}`;
        }
        if( url.indexOf('orderDetail') > -1 ){
            const paramsJson = JSON.stringify(params);
            return `${url}?orderDetailParam=${paramsJson}`;
        }
        if( url.indexOf('PICOPChecking') > -1 ){
            const paramsJson = JSON.stringify(params);
            return `${url}?picopParam=${paramsJson}`;
        }

        url = `${url}?${buildQueryString(payload)}`;
    }
    return url;
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = (response) => {
  return response.json()
}

const request = {
    fetch: (url, option = {}) => {
        let req;
        if (option && Object.keys(option).length !== 0 && option.constructor === Object) {
            const opt = Object.assign({
                headers: { ...DEFAULT_HEADERS },
                mode: 'cors',
                cache: 'no-cache'
            }, option);
            if (opt.hasOwnProperty('headers') && opt.headers && Object.keys(opt.headers).length !== 0) {
                let headers = { ...DEFAULT_HEADERS };
                headers = Object.assign(headers, opt.headers);
                opt.headers = headers;
            }
            req = fetch(url, opt);
        } else {
            req = fetch(url, {
                headers: { ...DEFAULT_HEADERS },
                mode: 'cors',
                cache: 'no-cache'
            });
        }
        return req.then((response) => {
            return response.json();
        }).then((response)=>{
            return {response}
        });
    },
    get: (path, params, option = {}) => {
        const url = buildApiUrl(path, params);
        option.headers ? option.headers : option.headers = request.defaultHeaders;
        option.method = 'GET';
        // TODO: use different customer user id to call API
        const authHeaders = sessionStorage.getItem('userId');
        option.headers['X-HSBC-User-Id'] = authHeaders ? authHeaders : 'HK06820788588801';
        // this part will delete in production env
        return request.fetch(url, option);
    },
    post: (path, params, body, option = {}) => {
        const url = buildApiUrl(path, params);
        option.headers ? option.headers : option.headers = request.defaultHeaders;
        option.method = 'POST';
        // TODO: use different customer user id to call API
        const authHeaders = sessionStorage.getItem('userId');
        option.headers['X-HSBC-User-Id'] = authHeaders ? authHeaders : 'HK06820788588801';
        // this part will delete in production env
        option.body = JSON.stringify(body);
        return request.fetch(url, option);
    },
    put: (path, params, body, option = {}) => {
        const url = buildApiUrl(path, params);
        option.method = 'PUT';
        option.body =JSON.stringify(body);
        return request.fetch(url, option);
    }
};

request.defaultHeaders = DEFAULT_HEADERS;
request.host = API_HOST;

export default request;
