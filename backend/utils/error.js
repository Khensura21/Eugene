// returns a generic err
//404 -- something not found
//500 -- something went wrong on the server

function errorHandler(err, req, res, next) {
    return res.status(err.status || 500).json({
        error : {
            message: err.message || "Oops! Something went wrong."
        }
    });
}

module.exports = errorHandler;