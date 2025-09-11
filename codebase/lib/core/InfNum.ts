

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
            
        }
        if (neg) {

        } else {
            if (l >= MAX_LAYER_VALUE) {
                let v_new = log10(l)
                num.set_layer(i, 0)
                if (num.get_layer(i+1) !== undefined) {
                    num.set_layer(i+1, (num.get_layer(i+1)  as number) + v_new)
                } else {
                    num.set_layer(i+1, v_new)
                }
            }
        }
    }
    return num
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
}

export default Num