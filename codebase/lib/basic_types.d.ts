export type dict = Record<string, any>

export type fn<R, T extends any[]> = (...args: {[I in keyof T]: T[I]}) => R extends any ? R : undefined