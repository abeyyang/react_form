export default class ObjectHelper {
    static isEmpty (obj) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    }

    static isNullOrEmpty (value) {
        return typeof value === 'undefined' || value === null || value === '';
    }

    static nullToDefault (value, defaultValue = '') {
        return ObjectHelper.isNullOrEmpty(value) ? defaultValue : value;
    }

    static isNullOrlengthZore (value) {
        return ObjectHelper.isNullOrEmpty(value) || value.length===0
    }
    static trimToEmpty (value) {
        let Temp= new String;
        Temp=value
        return Temp.trim;
    }   
}
