import {Expression} from './Expression';
import {LeftRightBasedExpression} from './LeftRightBasedExpression';
import {SourceBasedExpression} from './SourceBasedExpression';
import {VariableExpression} from './VariableExpression';
import {IteratorExpression} from './IteratorExpression';
import {NumberExpression} from './literal/NumberExpression';
import {StringExpression} from './literal/StringExpression';
import {BooleanExpression} from './literal/BooleanExpression';
import {NilExpression} from './literal/NilExpression';

/**
 * Operator symbols to readable names for expression naming
 */
const OPERATOR_NAMES: Record<string, string> = {
    '<>': 'not_equal',
    '<=': 'at_most',
    '>=': 'at_least',
    '<': 'less_than',
    '>': 'greater_than',
    '=': 'equals',
};

/**
 * Utility class for deriving human-readable names from OCL expressions.
 */
export class ExpressionNamer {
    private readonly maxLength: number;
    private readonly maxDepth: number;

    constructor(options: { maxLength?: number; maxDepth?: number } = {}) {
        this.maxLength = options.maxLength ?? 50;
        this.maxDepth = options.maxDepth ?? 3;
    }

    /**
     * Derive a human-readable name from an OCL expression.
     * 
     * @example
     * // Returns "age_greater_than_0"
     * namer.deriveName(parseExpression('self.age > 0'))
     * 
     * @example
     * // Returns "children_forAll"
     * namer.deriveName(parseExpression('self.children->forAll(c | c.age > 0)'))
     * 
     * @example
     * // Returns "name_not_equal_nil"
     * namer.deriveName(parseExpression('self.name <> nil'))
     */
    deriveName(expr: Expression): string {
        const parts: string[] = [];
        
        this.collectParts(expr, parts, 0);
        
        let name = parts.join('_')
            .replace(/^self_/, '')           // Remove leading "self_"
            .replace(/_+/g, '_')             // Collapse multiple underscores
            .replace(/^_|_$/g, '');          // Trim leading/trailing underscores
        
        // Truncate if too long, but try to end at word boundary
        if (name.length > this.maxLength) {
            name = name.substring(0, this.maxLength);
            const lastUnderscore = name.lastIndexOf('_');
            if (lastUnderscore > this.maxLength / 2) {
                name = name.substring(0, lastUnderscore);
            }
        }
        
        return name || 'unnamed';
    }

    private collectParts(expr: Expression, parts: string[], depth: number): void {
        // Limit recursion depth to avoid overly long names
        if (depth > this.maxDepth) return;
        
        if (expr instanceof VariableExpression) {
            // Extract the last part of the path (e.g., "self.age" → "age")
            const variable = expr.getVariable();
            const pathParts = variable.split('.');
            const lastPart = pathParts[pathParts.length - 1];
            if (lastPart && lastPart !== 'self') {
                parts.push(lastPart);
            }
        } else if (expr instanceof NumberExpression) {
            parts.push(String(expr.getValue()));
        } else if (expr instanceof StringExpression) {
            const val = expr.getValue();
            if (val && val.length <= 10) {
                parts.push(val.replace(/[^a-zA-Z0-9]/g, ''));
            }
        } else if (expr instanceof BooleanExpression) {
            parts.push(String(expr.getValue()));
        } else if (expr instanceof NilExpression) {
            parts.push('nil');
        } else if (expr instanceof IteratorExpression) {
            // For iterator expressions like forAll, exists, etc.
            this.collectParts(expr.getSource(), parts, depth + 1);
            const iteratorName = expr.constructor.name.replace('Expression', '');
            parts.push(iteratorName);
        } else if (expr instanceof LeftRightBasedExpression) {
            this.collectParts(expr.getLeft(), parts, depth + 1);
            
            // Check if it has an operator (OperationCallExpression)
            const op = (expr as unknown as { operator?: string }).operator;
            if (op && OPERATOR_NAMES[op]) {
                parts.push(OPERATOR_NAMES[op]);
            }
            
            this.collectParts(expr.getRight(), parts, depth + 1);
        } else if (expr instanceof SourceBasedExpression) {
            this.collectParts(expr.getSource(), parts, depth + 1);
            // Add the expression type name (e.g., "isEmpty", "size")
            const typeName = expr.constructor.name.replace('Expression', '');
            if (typeName && typeName !== 'SourceBased') {
                parts.push(typeName);
            }
        }
    }
}

/**
 * Default instance with standard settings
 */
export const defaultExpressionNamer = new ExpressionNamer();

/**
 * Convenience function using the default namer
 */
export function deriveNameFromExpression(expr: Expression): string {
    return defaultExpressionNamer.deriveName(expr);
}
