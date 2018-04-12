import {localeEnGB,localeZhHK,localeZhCN} from './index'


export default _=>{
    const href = window.location.href;

    const localCheck = href.includes( 'zh-cn' )?'localeZhCN'
                    :href.includes( 'en-gb' )?'localeEnGB'
                    :href.includes( 'zh-hk' )?'localeZhHK'
                    :'localeEnGB';
    return localCheck
}

export const dateFormats = { 'localeZhCN':'YYYY年MM月DD日','localeEnGB':'DD MMM YYYY','localeZhHK':'YYYY年MM月DD日' };

export const spaceFormats = {
    localeEnGB:" ",
    localeZhHK:"",
    localeZhCN:""
};

export const intlMessages = {
    localeEnGB,
    localeZhHK,
    localeZhCN
};

export const timeZone = {
    "localeEnGB":" HKT",
    "localeZhHK":"香港時間",
    "localeZhCN":"香港时间"
}

export const timeFormats = {
    "localeZhCN":['ah时mm分','上午','下午'],
    "localeEnGB":['h:mm a','a.m.','p.m.'],
    "localeZhHK":['ah時mm分','上午','下午']
}

export const checkAll = {
    "localeEnGB":"All",
    "localeZhHK":"全部",
    "localeZhCN":"全部"
}

export const checkLoading = {
    "localeEnGB":"Loading...",
    "localeZhHK":"加載中...",
    "localeZhCN":"加载中..."
}