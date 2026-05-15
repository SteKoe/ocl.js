import {OclExecutionContext} from '@/OclExecutionContext';
import {LocalVariables} from '@/types';

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
 * Operator symbols to readable names for invariant naming
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
 * Derive a human-readable name from an OCL expression.
 * Examples:
 *   - `self.age > 0` → "age_greater_than_0"
 *   - `self.children->forAll(c | c.age > 0)` → "children_forAll"
 *   - `self.name <> nil` → "name_not_equal_nil"
 */
function deriveNameFromExpression(expr: Expression, maxLength = 50): string {
    const parts: string[] = [];
    
    collectParts(expr, parts, 0);
    
    let name = parts.join('_')
        .replace(/^self_/, '')           // Remove leading "self_"
        .replace(/_+/g, '_')             // Collapse multiple underscores
        .replace(/^_|_$/g, '');          // Trim leading/trailing underscores
    
    // Truncate if too long, but try to end at word boundary
    if (name.length > maxLength) {
        name = name.substring(0, maxLength);
        const lastUnderscore = name.lastIndexOf('_');
        if (lastUnderscore > maxLength / 2) {
            name = name.substring(0, lastUnderscore);
        }
    }
    
    return name || 'unnamed';
}

function collectParts(expr: Expression, parts: string[], depth: number): void {
    // Limit recursion depth to avoid overly long names
    if (depth > 3) return;
    
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
        collectParts(expr.getSource(), parts, depth + 1);
        const iteratorName = expr.constructor.name.replace('Expression', '');
        parts.push(iteratorName);
    } else if (expr instanceof LeftRightBasedExpression) {
        collectParts(expr.getLeft(), parts, depth + 1);
        
        // Check if it has an operator (OperationCallExpression)
        const op = (expr as any).operator;
        if (op && OPERATOR_NAMES[op]) {
            parts.push(OPERATOR_NAMES[op]);
        }
        
        collectParts(expr.getRight(), parts, depth + 1);
    } else if (expr instanceof SourceBasedExpression) {
        collectParts(expr.getSource(), parts, depth + 1);
        // Add the expression type name (e.g., "isEmpty", "size")
        const typeName = expr.constructor.name.replace('Expression', '');
        if (typeName && typeName !== 'SourceBased') {
            parts.push(typeName);
        }
    }
}

/**
 * @oclSpecification
 * The OCL expression can be part of an Invariant which is a Constraint stereotyped as an «invariant».
 * When the invariant is associated with a Classifier, the latter is referred to as a "type" in this clause.
 * An OCL expression is an invariant of the type and must be true for all instances of that type at any time.
 * (Note that all OCL expressions that express invariants are of the type Boolean.)
 *
 * @oclExample context Person inv:
 *     self.age > 0
 */
export class InvariantExpression extends Expression {
    private readonly name: string;
    private readonly definition: Expression;

    constructor(oclExpression: Expression, name?: string) {
        super();
        this.name = name ?? deriveNameFromExpression(oclExpression);
        this.definition = oclExpression;
    }

    getName(): string {
        return this.name;
    }

    getDefinition(): Expression {
        return this.definition;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const evaluationResult = this.getDefinition().evaluate(visitor, localVariables);
        visitor.setEvaluatedValue(this, evaluationResult);
        return evaluationResult === true;
    }
}
