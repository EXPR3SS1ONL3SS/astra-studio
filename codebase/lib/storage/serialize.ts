import * as types from "../types"

const serializer = {
    decode(data: string) { // data starts off as a base64 string
        var obj = JSON.parse(btoa(data))
        
    },
    encode(data: types.dict) {

    },
    deepNaN(o: types.dict, k ?: string) {
        
    }
}

export default serializer