export default class RouteHelper {
    static getLocaleLong () {
        const href = window.location.href;
        if (href.includes('zh-cn')) {
            return 'zh-cn';
        } else if (href.includes('zh-hk')) {
            return 'zh-hk';
        } else if (href.includes('en-gb')) {
            return 'en-gb';
        }
    }

    static getCookie (name) {
        var value = '; ' + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }    

    static getOrderDetailsUrl (locale, orderId) {
        const url = `/${locale}/order-details/${orderId}`;
        return url;
    }

    static formatPath (pathname) {
        let path = pathname;

        if (!pathname.startsWith('/')) {
            path = `/${pathname}`;
        }
        const pathnames = path.split('/');
        const locale = pathnames[1];
        const currentSection = pathnames[2];

        return { locale, currentSection };
    }

    static getCancelOrderReviewUrl (locale, orderId) {
        const url = `/${locale}/cancel/${orderId}`;
        return url;
    }
}
