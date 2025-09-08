const ts = require('./typescript')
const fs = require('fs/promises')
const path = require('path')
const {Buffer} = require('buffer')
const vm = require('vm')
/**
 * 
 * @param {string} source The path of what you want to compile. If it is a directory but directory is false, it will NOT compile.
 * likewise, if it is a file and directory is true, it won't compile either.
 * Automatically sets up the file structing,
 * @param {boolean} directory Determines whether or not the source is a directory. must match to function properly.
 */
function convert(source, directory=false) {
    if (directory) {
        fs.readdir(source, {
            "recursive": true,
        }).then((stuff) => {

        }).catch((e) => {
            
        })
    }

}