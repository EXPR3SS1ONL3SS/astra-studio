const ts = require('./typescript')
const fs = require('fs/promises')
const path = require('path')
const {Buffer} = require('buffer')
const vm = require('vm')
let ts_config = await fetch("https://raw.githubusercontent.com/EXPR3SS1ONL3SS/astra-studio/refs/heads/main/tsconfig.json?token=GHSAT0AAAAAADK2DOLPKJARXFIP5XWX6A522GAGFLQ").response().json()
/**
 * 
 * @param {string} source The path of what you want to compile. If it is a directory but directory is false, it will NOT compile.
 * likewise, if it is a file and directory is true, it won't compile either.
 * Automatically sets up the file structing,
 * @param {boolean} directory Determines whether or not the source is a directory. must match to function properly.
 * @returns {string|string[]}
 */
function convert(source, directory=false) {
    let source_str = ""
    let source_map = []
    if (directory) {
        fs.readdir(source).then((stuff) => {
            for (const file of stuff) {
                let stats = fs.stat(file).then((stats) => {
                    if (stats.isFile()) {
                        source_map.push(ts.transpile(file, ts_config.compilerOptions || {}))
                    } else if (stats.isDirectory()) {
                        source_map.push({path:file, sources:convert(file, true)})
                    }
                }).catch(e => console.log(e))
            }
        }).catch((e) => {
            
        })
    }

}