function print(...data) {
    let str = ""
    data.forEach(string => {
        str = str + (typeof string === "string" ? string : String(string))
    })
    console.log(str)
}
let compiler = {}

const keywords = [
    "null", "undefined", "void", "function", "export", "default"
]

function includesOne(str, char) {
    let matches = str.split(char)
    return matches.length === 2
}

print(includesOne('var x = 13;', '='))

function isControlFlow(text) {
    return includesOne(text, 'else if') || includesOne(text, 'if') || includesOne(text, 'else')
}

function isKeyword(text) {
    for (const keyword of keywords) {
        if (includesOne(text, keyword)) return true
    }
    return false
}

function isDeclaration(text) {
    if (void 0 === text) return false;
    if (includesOne(text, "var") || includesOne(text, "const") || includesOne(text, "let")) {
        if (includesOne(text, "var")) {
            if (includesOne(text, "=") || includesOne(text, ";")) {
                return true
            }
        } else if (includesOne(text, "const")) {
            if (includesOne(text, "=") || includesOne(text, ";")) {
                return true
            }
        } else {
            if (includesOne(text, "=") || includesOne(text, ";")) {
                return true
            }
        }
    }
    return false
}



export default compiler