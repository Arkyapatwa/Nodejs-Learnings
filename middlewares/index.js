const fs = require("fs");

function logRequestResponse(fileName) {
    
    return (req, res, next) => {
        fs.appendFile(fileName, `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path} \n`, (err) => {
            if (err) throw err;

            next();
        })
    }
}

module.exports = {
    logRequestResponse
}