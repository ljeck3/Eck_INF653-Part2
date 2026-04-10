const { logEvents } = require("./logger")

const errorHandler = async(err, req, res, next) =>{
    await logEvents(`Error ${err.name} - ${err.message}`);
    console.error(`Error ${err.name} - ${err.message}`);
    console.log(err.stack);
    res.status(500).send(err.message);
}

module.exports = errorHandler