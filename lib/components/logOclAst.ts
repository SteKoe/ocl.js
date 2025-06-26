import {OclExecutionContext} from "./OclExecutionContext";
import {Expression} from "./expressions";

/**
 * Recursively prints a JSON object as an ASCII tree structure to the console,
 * including evaluated values from a provided id-to-value map.
 * @param obj The JSON object or primitive value to print.
 * @param valueMap A map from node IDs to their evaluated values.
 * @param name Optional label for the current node (e.g., 'root').
 * @param indent Current indentation string (used internally).
 * @param isLast Whether this node is the last sibling (used internally).
 */
export function logOclAst(
    obj: any,
    valueMap?: Map<string, any>,
    name?: string,
    indent: string = '',
    isLast: boolean = true
): void {
    const indentStr = '   ';       // spaces per indent level
    const connectorLast = '└─ ';
    const connectorMid = '├─ ';
    const connector = name != null ? (isLast ? connectorLast : connectorMid) : '';

    // If this property is the 'id' field, append its evaluated value
    if (name === 'id' && typeof obj === 'string') {
        const value = valueMap?.get(obj);
        const suffix = value !== undefined ? `${value}` : '';
        console.log(`${indent}${connector}id: ${obj}`);
        if (valueMap) {
            console.log(`${indent}${connector}evaluatedValue: ${suffix}`);
        }
        return;
    }

    // Print primitives (excluding 'id' which is handled above)
    if (name != null && (obj === null || typeof obj !== 'object')) {
        console.log(`${indent}${connector}${name}: ${obj}`);
        return;
    }

    // Print header for objects/arrays
    if (name != null) {
        console.log(`${indent}${connector}${name}`);
        indent += isLast ? indentStr : '│  ';
    }

    // Recurse into arrays
    if (Array.isArray(obj)) {
        obj.forEach((item, idx) => {
            const last = idx === obj.length - 1;
            logOclAst(item, valueMap, `[${idx}]`, indent, last);
        });
    }
    // Recurse into objects
    else if (obj && typeof obj === 'object') {
        const keys = Object.keys(obj);
        keys.forEach((key, idx) => {
            const last = idx === keys.length - 1;
            logOclAst((obj)[key], valueMap, key, indent, last);
        });
    }
}

export const logEvaluatedOclAst = (obj: Expression, valueMap?: OclExecutionContext) => {
    logOclAst(obj, valueMap.getEvaluatedValues());
}