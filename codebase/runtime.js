const ts = require("typescript");
const fs = require('node:fs');
const path = require("node:path");
const { computeCommonSourceDirectoryOfFilenames } = require("./typescript_compiler");

function read(dir="./ts",
    callback = (err, files) => {
        if (err) {console.warn("Error: " + err); return}
        for (const file of files) {
        
            console.log(file)
            fs.stat(path.join(dir, file), (sErr, stats) => {
                if (sErr) {
                    console.warn("Error: " + sErr)
                    return
                }
                if (stats.isFile()) {
                    fs.readFile(file, {
                        "encoding": "utf-8"
                    }, (rErr, data) => {
                        if (err) {
                            console.warn("Error reading file: " + rErr)
                            return
                        }
                        return data
                    })
                } else if (stats.isDirectory()) {
                    
                }
            })
        }
    }
) {
    let source = ""
    source = fs.readdir()
}

fs.readdir(file_path, (err, files) => {
    if (err) {
        console.warn("Error: " + err)
        return
    }
    for (const file of files) {
        fs.stat(path.join(file_path, file), (sErr))
    }
    read_async()
})