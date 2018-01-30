export class Utils {
    static getClassName(obj) {
        if (obj.typeName) {
            return obj.typeName;
        } else if (typeof obj === 'function') {
            return Utils._getFunctionName(obj);
        } else if (typeof obj === 'object') {
            const objectTypename = Utils._getFunctionName(obj.__proto__.constructor.toString());
            return objectTypename;
        }
    }

    static _getFunctionName(fn) {
        let name = fn.toString().split(' ')[1];
        name = name.substring(0, name.indexOf('('));
        return name.length > 0 ? name : undefined;
    }
}