import {dict, fn} from "../basic_types"
interface BaseNum {
    array: number[]
}
type Input = string | number | Num | BaseNum


// START dev variables
var MAX_LAYER_VALUE: number = 1e3 // Each layer goes up to 1000, before shifting down and adding the next.
var MAX_LAYERS: number = 2.5e2 // 250 layers, each layer is 10^v, with n arrows.
var log = Math.log;
var log10 = Math.log10;
var floor = Math.floor;
var abs = Math.abs;
var sqrt = Math.sqrt
var sign = Math.sign;
var pow = Math.pow;
var pow10 = (x:number) => pow(10,x);
var root = (x:number,y:number):number => pow(x,1/y);
// END dev variables
//START dev functions
function normalize(num: Num): Num {
    for (var i = 1; (i < num.size) && (i <= MAX_LAYERS); i++) {
        let l = num.get_layer(i)
        if (!l) continue;
        let neg: boolean = (l !== undefined) ? (i < 0) ? true : false : false
        if (abs(l) >= MAX_LAYER_VALUE) {
            let v_new = log10(abs(l))
            num.set_layer(i, 0)
            num.set_layer(i+1, (
                (typeof num.get_layer(i+1) !== "undefined") ? (num.get_layer(i+1) as number) + (neg ? -v_new : v_new) : neg ? -v_new : v_new
            ))
        }
    }
    return num
}
function FC_NN(...values: number[]): Num {
    let temp = new Num(0)
    for (var i = 0; i < values.length; i++) {
        temp.set_layer(i, values[i])
    }
    return temp
}
function FC(...values: number[]): Num {
    return normalize(FC_NN(...values))
}
//END dev functions
class Num {
    private array = [] as number[]
    get size(): number {
        return this.array.length
    }
    get_layer(i:number): number | undefined {
        return this.array[i]
    }
    set_layer(i:number,v:number): void {
        this.array[i] = v
    }
    private normalize(): void {
        this.array = normalize(this).array
    }
    abs(): Num {
        var x = this.clone()
        x.array[0] = 1
        return x
    }
    static abs(x: Input) {
        return new Num(x).abs()
    }
    log10(): Num {
        var x = this.clone()
        if (x.lte(0)) {
            return Num.NaN
        } else if (x.size >= 2) {
            let components = [] as number[]
            components.push(Math.sign(x.array[1]))
            components.push(Math.abs(x.array[1]))
            for (var i = 2; i < x.size; i++) {
                let v = x.array[i]
                components.push(v - 1)
            }
            return FC(...components)
        } else {
            return FC(x.array[0], Math.log10(x.array[1]))
        }
    }
    static log10(x: Input): Num {
        return new Num(x).log10()
    }
    log(base: Input): Num {
        var x = this.clone()
        var b = new Num(base)
        if (x.lte(0) || b.lte(0)) {
            return Num.NaN
        }
        if (b.eq(1)) {
            return Num.NaN
        } else if (!(x.array[2] && b.array[2])) {
            return FC(x.array[0], Math.log(x.array[1] / Math.log(b.array[1])))
        }
        return Num.div(x.log10(), b.log10())
    }
    static log(num: Input, base: Input): Num {
        return new Num(num).log(base)
    }
    recip(): Num {
        var x = this.clone()
        if (x.array[1] === 0) {
            return Num.NaN
        } else if (x.array[1] === Number.POSITIVE_INFINITY) {
            return Num.zero
        } else if (!(x.array[2])) {
            return FC(x.array[0], 1/x.array[1])
        } else {
            let after = x.array.slice(2)
            return FC(x.array[0], -x.array[1], ...after)
        }
    }
    static recip(num: Input): Num {
        return new Num(num).recip()
    }
    mul(other: Input): Num {
        var x = this.clone()
        var y = new Num(other)


        return this
    }
    static mul(num: Input, value: Input): Num {
        return new Num(num).mul(value)
    }
    div(other: Input): Num {
        var x = this.clone()
        var y = new Num(other)
        return x.mul(y.recip())
    }
    static div(num: Input, value: Input): Num {
        return new Num(num).div(value)
    }

    clone(): Num {
        return this
    }

    cmp(x: Input): number {
        let ret = -1
        if (!(x instanceof Num)) x = new Num(x);
        var c = x.clone()
        c.normalize()
        x.normalize()
        if (c.size > x.size) return 1;
        if (c.size < x.size) return -1;
        for (var i = c.size; i > 0; i--) {
            let v1 = c.array[i], v2 = x.array[i];
            if (v1 < v2) break;
            if (v1 > v2) {ret = 1; break}
            if (v1 == v2) {ret = 0}
        }
        return ret
    }
    static cmp(x:Input,y:Input): number {
        return new Num(x).cmp(y)
    }
    gte(x:Input): boolean {
        var v = this.clone()
        return v.cmp(x) >= 0
    }
    gt(x:Input): boolean {
        var v = this.clone()
        return v.cmp(x) > 0
    }
    eq(x:Input): boolean {
        var v = this.clone()
        return v.cmp(x) === 0
    }
    lt(x:Input): boolean {
        var v = this.clone()
        return v.cmp(x) < 0
    }
    lte(x:Input): boolean {
        var v = this.clone()
        return v.cmp(x) <= 0
    }
    static gte(x:Input,y:Input): boolean {
        return new Num(x).gte(y)
    }
    static gt(x:Input,y:Input): boolean {
        return new Num(x).gt(y)
    }
    static eq(x:Input,y:Input): boolean {
        return new Num(x).eq(y)
    }
    static lt(x:Input,y:Input): boolean {
        return new Num(x).lt(y)
    }
    static lte(x:Input,y:Input): boolean {
        return new Num(x).lte(y)
    }

    isNaN(): boolean {
        var x = this.clone()
        return x.array[0] == Num.NaN.array[0]
    }
    static isNaN(x: Input): boolean {
        return new Num(x).isNaN()
    }


    pow(x: Input): Num {
        var a = this.clone()
        var b = new Num(x)
        if (a.eq(0)) {
            return b.eq(0) ? FC_NN(1, 1) : a
        }
        if (a.eq(1)) {
            return a
        }
        if (b.eq(0)) {
            return FC_NN(1,1)
        }



    //     if (b.sign === 1 && b.layer === 0 && b.mag === 1) {
    //       return a;
    //     }

    //     var result = a.absLog10().mul(b).pow10();

    //     if (this.sign === -1) {
    //       if (Math.abs(b.toNumber() % 2) % 2 === 1) {
    //         return result.neg();
    //       } else if (Math.abs(b.toNumber() % 2) % 2 === 0) {
    //         return result;
    //       }

    //       return new Decimal(Decimal.dNaN);
    //     }

    //     return result;
    //   }
        return this
    }
    add(x: Input): Num {
        if (!(x instanceof Num)) x = new Num(x);
        this.normalize()
        x.normalize()




        return this
    }
    static add(x: Input, y: Input): Num {
        return new Num(x).add(y)
    }
    constructor(value: Input) {
        if (typeof value === "string") {
            return Num.fromString(value)
        } else if (typeof value === "number") {
            return Num.fromNumber(value)
        } else if (typeof value === "object") {
            if (value instanceof Num) {
                return value
            } else if (value.hasOwnProperty("array") && Array.isArray(value.array)) {
                this.array = value.array
            } else {
                throw new Error("Invalid object input")
            }
        }
    }
    static fromNumber(num: number): Num {
        if (isNaN(num) || !isFinite(num)) return new Num({array: [0,0]});
        if (num === 0) return new Num({array: [0,0]});
        if (num < 1 && num > 0) {
            let exp: number = log10(num)
            return new Num({array: [1,exp]})
        } else if (num < 0)//negative case
        {
            let exp: number = log10(abs(num))
            return new Num({array: [-1, exp]})
        }
        return new Num({array: [1, log10(num)]})
    }
    static fromString(str: string): Num {
        let array: number[] = []
        return new Num({array: array})
    }
    static get zero() {
        return new Num({array: [0,0]})
    }
    static get pi():Num {
        return new Num({array: [1, 3.1415926535897932384626433832795028841971693993751]})
    }
    static get e():Num {
        return new Num({array: [1, 2.71828182845904523536028747135266249775724709369995]})
    }
    static get NaN(): Num {
        return new Num({array: [-2, 0]})
    }
    static config: dict = {
        MAX_LAYERS: MAX_LAYERS,
        MAX_LAYER_VALUE: MAX_LAYER_VALUE,
        FORMAT_DIGITS: 3
        
    }
}

export default Num