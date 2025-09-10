import * as tsc from './_tsc'
const fs = require('fs/promises')
/**
 * 
 * @param {string} url
 * @param {function(Error):any|void} error_handler
 * @returns {string} 
 */
async function fetch_json(url, error_handler = err => console.warn(err)) {
    let is_url = (url.includes("http") && url.includes("://")) && (url.match("(.[a-zA-Z}{2,3})"))
    if (!is_url) throw new Error("url must be an actual url.");
    try {
        const response = await fetch(url, {"method": "GET"})
        if (!response) throw new Error("no response has been found. aborting fetch for url " + url + ".");
        const json = await response.json()
        if (!json) console.log(`Fetch for url ${url} returned no JSON body.`);
        return json
    } catch(err) {
        error_handler(err)
        if (error_handler.toString().includes("return")) return error_handler(err);
    } finally {
        console.log(`Fetch for url ${url} has ended. `)
    }
}

const ts_config_json = await fetch_json("https://raw.githubusercontent.com/EXPR3SS1ONL3SS/astra-studio/refs/heads/main/tsconfig.json")
const ts_config = JSON.parse(ts_config_json)
/**
 * 
 * @param {string} source The path of what you want to compile. If it is a directory but directory is false, it will NOT compile.
 * likewise, if it is a file and directory is true, it won't compile either.
 * Automatically sets up the file structing,
 * @param {boolean} directory Determines whether or not the source is a directory. must match to function properly.
 * @returns {string|any[]}
 */
function convert(source, directory=false) {
    if (directory) {
        let source_map = []
        fs.readdir(source).then((stuff) => {
            for (const file of stuff) {
                fs.stat(file).then((stats) => {
                    if (stats.isFile()) {
                        fs.readFile(file).then((file) => {
                            let stringify = file.toString("utf8")
                            source_map.push(ts.transpile(stringify, ts_config.compilerOptions || {}))
                        }).catch(e => console.warn(e))
                    } else if (stats.isDirectory()) {
                        source_map.push({path:file, sources:convert(file, true)})
                    }
                }).catch(e => console.warn(e))
            }
        }).catch(e => console.warn(`Error transpiling directory [${source}]: ${e}`))
        return source_map
    }
    let source_string = ""
    fs.readFile(source).then((file) => {
        fs.stat(file).then((stats) => {
            if (stats.isFile()) {
                let stringify = file.toString("utf8")
                source = stringify
            } else {
                throw new Error(`Error transpiling file [${source}]: ${e}`)
            }
        }).catch(e => console.warn(e))
    })
    return source_string
}

let source_map = convert("./ts")
console.log(JSON.stringify(source_map))