import { TransformOptions } from 'esbuild';

declare type GeneratedColumn = number;
declare type SourcesIndex = number;
declare type SourceLine = number;
declare type SourceColumn = number;
declare type NamesIndex = number;
declare type SourceMapSegment = [GeneratedColumn] | [GeneratedColumn, SourcesIndex, SourceLine, SourceColumn] | [GeneratedColumn, SourcesIndex, SourceLine, SourceColumn, NamesIndex];

interface SourceMapV3 {
    file?: string | null;
    names: string[];
    sourceRoot?: string;
    sources: (string | null)[];
    sourcesContent?: (string | null)[];
    version: 3;
}
interface EncodedSourceMap extends SourceMapV3 {
    mappings: string;
}
interface DecodedSourceMap extends SourceMapV3 {
    mappings: SourceMapSegment[][];
}
declare type SourceMapInput = string | EncodedSourceMap | DecodedSourceMap | TraceMap;
declare abstract class SourceMap {
    version: SourceMapV3['version'];
    file: SourceMapV3['file'];
    names: SourceMapV3['names'];
    sourceRoot: SourceMapV3['sourceRoot'];
    sources: SourceMapV3['sources'];
    sourcesContent: SourceMapV3['sourcesContent'];
    resolvedSources: SourceMapV3['sources'];
}

declare class TraceMap implements SourceMap {
    version: SourceMapV3['version'];
    file: SourceMapV3['file'];
    names: SourceMapV3['names'];
    sourceRoot: SourceMapV3['sourceRoot'];
    sources: SourceMapV3['sources'];
    sourcesContent: SourceMapV3['sourcesContent'];
    resolvedSources: string[];
    private _encoded;
    private _decoded;
    private _decodedMemo;
    private _bySources;
    private _bySourceMemos;
    constructor(map: SourceMapInput, mapUrl?: string | null);
}

declare function installSourceMapSupport(): Map<string, string> | undefined;
declare function applySourceMap({ code, map }: {
    code: string;
    map: SourceMapInput;
}, filePath: string, sourcemaps?: Map<string, string>): string;

declare function transformDynamicImport(code: string): {
    code: string;
    map: EncodedSourceMap;
} | undefined;

declare type Transformed = {
    code: string;
    map: string;
};
declare function transformSync(code: string, filePath: string, extendOptions?: TransformOptions): Transformed;
declare function transform(code: string, filePath: string, extendOptions?: TransformOptions): Promise<Transformed>;

declare function resolveTsPath(filePath: string): string | undefined;

declare type Version = [number, number, number];
declare const compareNodeVersion: (version: Version) => number;

export { applySourceMap, compareNodeVersion, installSourceMapSupport, resolveTsPath, transform, transformDynamicImport, transformSync };
