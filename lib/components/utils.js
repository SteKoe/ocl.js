export class Utils {
    static getClassName(obj) {
        if(typeof Utils.typeDeterminerFn === 'function') {
            return Utils.typeDeterminerFn(obj);
        }

        if (obj.typeName) {
            return obj.typeName;
        } else if (typeof obj === 'function') {
            return Utils._getFunctionName(obj);
        } else if (typeof obj === 'object') {
            return Utils._getFunctionName(obj.constructor.toString());
        }
    }

    static _getFunctionName(fn) {
        let name = fn.toString().split(' ')[1];
        name = name.substring(0, name.indexOf('('));
        return name.length > 0 ? name : undefined;
    }
}
