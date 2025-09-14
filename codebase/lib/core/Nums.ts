// -- primary module for numbers and such in astra. -- \\
import {dict, fn} from 'bTypes'

const num = {} as INum

num.clamp = function(n,min,max) {
    return n < min ? min : n > max ? max : n
} as fn<number, [number, number, number]>

num.round = function(n, digits) {
    return Math.trunc(n*10**digits)/10**digits
} as fn<number, [number, number]>

var IntOp = (function(n, bits, signed = false) {
    return num.round(num.clamp(n,signed ? -(2**bits)-1 : 0, (2**bits)-1), 0)
}) as fn<number, [number, number, boolean?]>

num.u_int8 = (function(n) {
    return IntOp(n, 8)
}) as fn<number, [number]>
num.u_int16 = (function (n) {
    return IntOp(n, 16)
}) as fn<number, [number]>
num.u_int32 = (function(n) {
    return IntOp(n, 31)
}) as fn<number, [number]>
num.int8 = (function(n) {
    return IntOp(n, 8, true)
}) as fn<number, [number]>
num.int16 = (function(n) {
    return IntOp(n, 16, true)
}) as fn<number, [number]>
num.int32 = (function(n) {
    return IntOp(n, 31, true)
}) as fn<number, [number]>
num.float = (function(n) {
    if (n.toString().includes(".") || n.toString().includes("e")) {
        return n
    }
    return 0.0
}) as fn<number, [number]>
num.long = (function(n) {
    return BigInt(IntOp(n, 63, true))
}) as fn<bigint, [number]>

interface INum {
    clamp: fn<number, [number, number, number]>
    round: fn<number, [number, number]>
    u_int8: fn<number, [number]>
    u_int16: fn<number, [number]>
    u_int32: fn<number, [number]>
    int8: fn<number, [number]>
    int16: fn<number, [number]>
    int32: fn<number, [number]>
    float: fn<number, [number]>
    long: fn<bigint, [number]>
}

export default num