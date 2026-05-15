/**
 * Interface for pluggable metamodel providers.
 *
 * Implement this interface to integrate ocl.js with runtime metamodels
 * where type hierarchies are not based on JavaScript prototype chains.
 *
 * This is particularly useful for:
 * - Modeling platforms with dynamic metamodels (e.g., EMF/Ecore-style)
 * - Systems where objects are plain data and type information is external
 * - Runtime environments where types and relationships evolve dynamically
 *
 * @example
 * ```typescript
 * const provider: IMetamodelProvider = {
 *   getTypeName(obj) {
 *     return obj._type; // or lookup in external metamodel registry
 *   },
 *   isKindOf(obj, typeName) {
 *     const objType = this.getTypeName(obj);
 *     return metamodel.isSubtypeOf(objType, typeName);
 *   },
 *   isTypeOf(obj, typeName) {
 *     return this.getTypeName(obj) === typeName;
 *   }
 * };
 *
 * const engine = OclEngine.create()
 *   .setMetamodelProvider(provider)
 *   .addOclExpression('context Entity inv: self.oclIsKindOf(NamedElement)');
 * ```
 */
export interface IMetamodelProvider {
    /**
     * Returns the type name for a given object.
     *
     * @param obj The object to determine the type of
     * @returns The type name as a string, or undefined if the type cannot be determined
     */
    getTypeName(obj: unknown): string | undefined;

    /**
     * Checks if an object is an instance of the specified type or any of its supertypes.
     *
     * This method should implement the metamodel's inheritance/subtype relationship.
     * For example, if `Person` extends `Entity`, then `isKindOf(personObj, 'Entity')`
     * should return `true`.
     *
     * @param obj The object to check
     * @param typeName The type name to check against (including supertypes)
     * @returns true if the object is an instance of typeName or any supertype
     */
    isKindOf(obj: unknown, typeName: string): boolean;

    /**
     * Checks if an object is exactly of the specified type (no inheritance).
     *
     * Unlike `isKindOf`, this method should only return true if the object's
     * direct type matches the specified type name exactly.
     *
     * @param obj The object to check
     * @param typeName The exact type name to match
     * @returns true if the object is exactly of the specified type
     */
    isTypeOf(obj: unknown, typeName: string): boolean;
}
