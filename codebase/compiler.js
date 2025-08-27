let EXPORTS = {}


EXPORTS.Compiler = new class Compiler {
    Output = "";
    constructor() {
        
    }
    static async compile(file) {
        let source = ""
        let lines = []
        if (file instanceof File) {
            source = await file.text()
            lines = []
        } else {
            return ""
        }
    }
}();



module.exports = EXPORTS