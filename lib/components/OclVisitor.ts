import {
    AbsExpression,
    AdditionExpression,
    AndExpression,
    AsSetExpression,
    AtExpression,
    ClassifierContextExpression,
    CollectExpression,
    ConcatExpression,
    DeriveExpression,
    DivideExpression,
    ExistsExpression,
    FirstExpression,
    ForAllExpression,
    IfExpression,
    ImpliesExpression,
    IndexOfExpression,
    InitExpression,
    InvariantExpression,
    IsEmptyExpression,
    LastExpression,
    LetExpression,
    LiteralExpression,
    ModuloExpression,
    MultiplyExpression,
    NativeJsFunctionCallExpression,
    NotEmptyExpression,
    NotExpression,
    OclIsKindOfExpression,
    OclIsTypeOfExpression,
    OclIsUndefinedExpression,
    OperationCallExpression,
    OperationContextExpression,
    OrExpression,
    PackageDeclaration,
    PowerExpression,
    PropertyContextExpression,
    RejectExpression,
    SelectExpression,
    SizeExpression,
    SqrtExpression,
    SubstractionExpression,
    SubstringExpression,
    SumExpression,
    ToIntegerExpression,
    ToLowerCaseExpression,
    ToRealExpression,
    ToUpperCaseExpression,
    UnionExpression,
    VariableExpression,
    XorExpression
} from './expressions';

export interface OclVisitor {
    visitPackageDeclaration(expr: PackageDeclaration): OclVisitor;

    visitClassifierContextExpression(expr: ClassifierContextExpression): boolean;

    visitPropertyContextExpression(expr: PropertyContextExpression): boolean;

    visitOperationContextExpression(expr: OperationContextExpression): void;

    visitIfExpression(expr: IfExpression): boolean;

    visitDeriveExpression(expr: DeriveExpression): any;

    visitInitExpression(expr: InitExpression): any;

    visitInvariantExpression(expr: InvariantExpression): boolean;

    visitOperationCallExpression(expr: OperationCallExpression): boolean;

    visitOclIsUndefinedExpression(expr: OclIsUndefinedExpression): boolean;

    visitOclIsTypeOfExpression(expr: OclIsTypeOfExpression): boolean;

    visitOclIsKindOfExpression(expr: OclIsKindOfExpression): boolean;

    visitNativeJsFunctionCallExpression(expr: NativeJsFunctionCallExpression): any;

    visitLetExpression(expr: LetExpression): void;

    visitLiteralExpression(expr: LiteralExpression<any>): any;

    visitIteratorExpression(expr: ForAllExpression): boolean;

    visitImpliesExpression(expr: ImpliesExpression): boolean;

    visitVariableExpression(expr: VariableExpression): any;

    visitSizeExpression(expr: SizeExpression): number;

    visitNotExpression(expr: NotExpression): boolean;

    visitIsEmptyExpression(expr: IsEmptyExpression): boolean;

    visitNotEmptyExpression(expr: NotEmptyExpression): boolean;

    visitConcatExpression(expr: ConcatExpression): string;

    visitIndexOfExpression(expr: IndexOfExpression): number;

    visitSubstringExpression(expr: SubstringExpression): string;

    visitToLowerCaseExpression(expr: ToLowerCaseExpression): string;

    visitToUpperCaseExpression(expr: ToUpperCaseExpression): string;

    visitToRealExpression(expr: ToRealExpression): number;

    visitToIntegerExpression(expr: ToIntegerExpression): number;

    visitLastExpression(expr: LastExpression): any;

    visitFirstExpression(expr: FirstExpression): any;

    visitAsSetExpression(expr: AsSetExpression): Array<any>;

    visitAtExpression(expr: AtExpression): any;

    visitSumExpression(expr: SumExpression): number;

    visitCollectExpression(expr: CollectExpression): Array<any>;

    visitExistsExpression(expr: ExistsExpression): boolean;

    visitRejectExpression(expr: RejectExpression): Array<any>;

    visitSelectExpression(expr: SelectExpression): Array<any>;

    visitUnionExpression(expr: UnionExpression): Array<any>;

    visitOrExpression(expr: OrExpression): boolean;

    visitXorExpression(expr: XorExpression): boolean;

    visitAndExpression(expr: AndExpression): boolean;

    visitAdditionExpression(expr: AdditionExpression): number;

    visitSubstractionExpression(expr: SubstractionExpression): number;

    visitMultiplyExpression(expr: MultiplyExpression): number;

    visitModuloExpression(expr: ModuloExpression): number;

    visitPowerExpression(expr: PowerExpression): number;

    visitDivideExpression(expr: DivideExpression): number;

    visitAbsExpression(expr: AbsExpression): number;

    visitSqrtExpression(expr: SqrtExpression): number;

    getLabelsToExecute(): Array<string>;

    getObjectToEvaluate(): any;

    getRegisteredType(targetTypeName: string): any;

    getTargetTypeName(): string;

    getEvaluationResult(): boolean;
}
