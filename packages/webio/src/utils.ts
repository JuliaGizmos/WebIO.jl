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
export type OptionalKeys<T, K> = Pick<T, Exclude<keyof T, K>> & Partial<T>

export type ObservableGlobalSpecifier = {name: string, scope:string};
/**
 * Julia-generated code likes to specify observables as an object with
 * {scope: string, name: string, id: string, type: "observable"}
 * and I'm not competent enough to refactor so that it just specifies the
 * name within the scope.
 */
export type ObservableSpecifier = string | ObservableGlobalSpecifier;
export const getObservableName = (specifier: ObservableSpecifier): string => {
  if (typeof specifier === "string") {
    return specifier;
  }
  return specifier.name;
};


