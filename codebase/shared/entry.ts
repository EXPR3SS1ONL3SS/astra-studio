/**
 * @author EXPR3SS1ONL3SS
 * @description Primary code things for astra lang, used for astra studio.
 * @license MIT
 * This is incredibly abstract. I hope this doesnt bite me in the ass later on.
 */
import num from "Num"
import {fn} from 'bTypes'
import * as fs from 'node:fs/promises'

var includesOne = (function(str, chars) {
    return str.match(new RegExp(`/${chars}\g`))?.length === 0
}) as fn<boolean, [string, string]>

const keywords: Set<string> = new Set([
    "fn","end","return","if","else","elif","for","in","true","false","null",
    "log","class","struct","enum","prop","pub","priv","readonly","static",
    "self","async","exception","prototype","type","f"
])
const builtin_types: Set<string> = new Set([
    "String","char","number","void","undefined","null","dict","array",
    "long","uint8","uint16","uint32","int8","int16","int32","float"
])

var parseScope = (function(line) {
    let scope = line.charAt(line.indexOf("*")+1)
    if (scope === "r") {
        return "const"
    } else if (scope === "l") {
        return "let"
    }
    return "var"
}) as fn<string, [string]>
var parseType = (function(line) {
    let t = (
        includesOne(line, "as") ? line.substring(line.indexOf("as"))
        : line.substring(line.indexOf(":"), line.substring(line.indexOf(":")).replaceAll(" ","").indexOf("=")-1)
    )
    
    return t
}) as fn<string, [string]>


class generator {
    private line: number = 0
    private lines: string[] = []
    private source: string = ""
    constructor(source_path: string) {
        
        fs.readFile(source_path, 'utf8')
        .then((text: string) => {
            this.source = text
        }).catch(e => {
            console.log("Error reading source file:", e)
        })
    }
    public parse_lines(): void {
        let lines: string[] = this.source.trimEnd().split("\n")
        this.lines = lines
        this.line = 1
    }
    public compile(): string {
        let out: string = ""
        for (let i = this.line; i < this.lines.length; i++) {

        }

        return out
    }
}

let g = new generator("")