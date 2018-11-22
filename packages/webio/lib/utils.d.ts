/**
 * Helper type to avoid specifying Pick<..., Exclude<...>> everywhere.
 *
 * E.g. if MyType is
 * ```
 * interface MyType {
 *   foo: string,
 *   bar: number
 * }
 * ```,
 * then `OptionalKeys<MyType, "foo">` will be equivalent to
 * ```
 * interface MyTypeWithOptionalFoo {
 *   foo?: string;
 *   bar: number;
 * }
 * ```
 */
export declare type OptionalKeys<T, K> = Pick<T, Exclude<keyof T, K>> & Partial<T>;
export declare type ObservableGlobalSpecifier = {
    name: string;
    scope: string;
};
/**
 * Julia-generated code likes to specify observables as an object with
 * {scope: string, name: string, id: string, type: "observable"}
 * and I'm not competent enough to refactor so that it just specifies the
 * name within the scope.
 */
export declare type ObservableSpecifier = string | ObservableGlobalSpecifier;
export declare const getObservableName: (specifier: ObservableSpecifier) => string;
