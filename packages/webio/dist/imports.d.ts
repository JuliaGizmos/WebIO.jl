import SystemJS from "systemjs";
/**
 * Possible types of import specifiers.
 *
 * See {@link BlockImport} and {@link ConcreteImport} and their child
 * interfaces for more information.
 */
export declare const enum ImportType {
    SYNC_BLOCK = "sync_block",
    ASYNC_BLOCK = "async_block",
    JS = "js",
    CSS = "css",
    HTML = "html"
}
/**
 * All possible block imports.
 *
 * See {@link BlockImportBase}.
 */
export declare type BlockImport = SyncBlockImport | AsyncBlockImport;
/**
 * The value obtained from importing a block.
 */
export declare type BlockImportResult = ConcreteImportResult[];
/**
 * All possible concrete imports.
 *
 * See {@link ConcreteImport}.
 */
export declare type ConcreteImport = JSImport | CSSImport | HTMLImport;
/**
 * Possible types for a concrete import.
 *
 * Currently, we can't be any more specific than "any". `null` is returned for
 * non-JS-module imports.
 */
export declare type ConcreteImportResult = any | null;
/**
 * Abstract base interface for all imports.
 *
 * See {@link BlockImport} and {@link ConcreteImport} and their child
 * interfaces for more information.
 */
export interface ImportBase {
    type: ImportType;
}
/**
 * Abstract base interface for block imports.
 *
 * A block import is better though of as a block _of_ imports. All the things
 * specified by the block import need to be individually imported.
 */
export interface BlockImportBase extends ImportBase {
    data: ConcreteImport[];
}
/**
 * Abstract base interface for concrete imports.
 *
 * A concrete import is some logical single resource/entity (e.g. a stylesheet
 * or a JavaScript file).
 */
export interface ConcreteImportBase extends ImportBase {
    name: string | null;
    url?: string;
    blob?: string;
}
/**
 * A block import that loads its sub-imports sequentially.
 *
 * E.g. if data is `[A, B]`, then `A` completes loading before `B` begins to
 * load.
 */
export interface SyncBlockImport extends BlockImportBase {
    type: ImportType.SYNC_BLOCK;
}
/**
 * A block import that loads it sub-imports asynchronously and concurrently.
 *
 * E.g. if data is `[A, B]`, then `A` and `B` are loaded in no particular order
 * and no guarantees are made as to which will finish first or if one will be
 * loaded before the other.
 */
export interface AsyncBlockImport extends BlockImportBase {
    type: ImportType.ASYNC_BLOCK;
}
/**
 * A concrete import for a JavaScript file/script/library.
 */
export interface JSImport extends ConcreteImportBase {
    type: ImportType.JS;
}
/**
 * A concrete import for a CSS stylesheet/snippet.
 */
export interface CSSImport extends ConcreteImportBase {
    type: ImportType.CSS;
}
/**
 * A concrete import for an HTML file/snippet.
 */
export interface HTMLImport extends ConcreteImportBase {
    type: ImportType.HTML;
}
export declare const importJS: (importData: JSImport) => any;
export declare const importCSS: (importData: CSSImport) => Promise<void> | Promise<{}>;
export declare const importSyncBlock: (importData: SyncBlockImport) => Promise<any[]>;
export declare const importAsyncBlock: (importData: AsyncBlockImport) => Promise<any[]>;
/**
 * Import a _thing_.
 * @param importData
 */
export declare const importResource: (importData: ConcreteImport) => any;
export declare const importBlock: (importData: BlockImport, config?: SystemJS.Config | undefined) => Promise<any[]>;
