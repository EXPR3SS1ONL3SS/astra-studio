export type dict = Record<string, any>

export type fn = (...args: any[]) => any

function func(x:number, y: string): number {
    return x + Number(y)
}

let type1 = typeof func(1,"2")
let type2 = typeof(func(1,"2"))

console.log(type1)
console.log(type2)