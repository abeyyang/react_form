import { localeEnGB, localeZhHK, localeZhCN } from './index';

export const LONG_LOCALES = ['en-gb', 'zh-hk', 'zh-cn'];
export const DEFAULT_LONG_LOCALE = LONG_LOCALES[0];
export const NLS = {
    'en-gb': {
        locale : 'en',
        msg: localeEnGB,
        title: 'English'
    },
    'zh-hk': {
        locale : 'zh',
        msg: localeZhHK,
        title: '繁體'
    },
    'zh-cn': {
        locale : 'zh',
        msg: localeZhCN,
        title: '简体'
    }        
};

