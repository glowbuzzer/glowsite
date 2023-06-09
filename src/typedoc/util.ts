// work around stupid react-router v6 relative link behaviour
import {ReflectionKind} from "typedoc";

export function relative_path(path: string) {
    return new URL(path, window.location.href).pathname
}

export enum ReflectionKindLocal {
    Project = 1,
    Module = 2,
    Namespace = 4,
    Enum = 8,
    EnumMember = 16,
    Variable = 32,
    Function = 64,
    Class = 128,
    Interface = 256,
    Constructor = 512,
    Property = 1024,
    Method = 2048,
    CallSignature = 4096,
    IndexSignature = 8192,
    ConstructorSignature = 16384,
    Parameter = 32768,
    TypeLiteral = 65536,
    TypeParameter = 131072,
    Accessor = 262144,
    GetSignature = 524288,
    SetSignature = 1048576,
    /** @deprecated will be removed in v0.25, not used */
    ObjectLiteral = 2097152,
    TypeAlias = 4194304,
    Reference = 8388608
}

// total hack - we accept both but they map to the same numberic values above
// workaround for https://github.com/TypeStrong/typedoc/issues/2305
export function kindOf(kind: ReflectionKindLocal | ReflectionKind): string {
    switch (kind) {
        case ReflectionKindLocal.Project:
            return "Project"
        case ReflectionKindLocal.Module:
            return "Module"
        case ReflectionKindLocal.Namespace:
            return "Namespace"
        case ReflectionKindLocal.Enum:
            return "Enum"
        case ReflectionKindLocal.EnumMember:
            return "Enum Member"
        case ReflectionKindLocal.Variable:
            return "Variable"
        case ReflectionKindLocal.Function:
            return "Function"
        case ReflectionKindLocal.Class:
            return "Class"
        case ReflectionKindLocal.Interface:
            return "Interface"
        case ReflectionKindLocal.Constructor:
            return "Constructor"
        case ReflectionKindLocal.Property:
            return "Property"
        case ReflectionKindLocal.Method:
            return "Method"
        case ReflectionKindLocal.CallSignature:
            return "Call Signature"
        case ReflectionKindLocal.IndexSignature:
            return "Index Signature"
        case ReflectionKindLocal.ConstructorSignature:
            return "Constructor Signature"
        case ReflectionKindLocal.Parameter:
            return "Parameter"
        case ReflectionKindLocal.TypeLiteral:
            return "Type Literal"
        case ReflectionKindLocal.TypeParameter:
            return "Type Parameter"
        case ReflectionKindLocal.Accessor:
            return "Accessor"
        case ReflectionKindLocal.GetSignature:
            return "Get Signature"
        case ReflectionKindLocal.SetSignature:
            return "Set Signature"
        case ReflectionKindLocal.ObjectLiteral:
            return "Object Literal"
        case ReflectionKindLocal.TypeAlias:
            return "Type Alias"
        case ReflectionKindLocal.Reference:
            return "Reference"
        default:
            return "Unknown"
    }
}