var Exception = require('./Exception.js');

exports.IllegalArgumentException = function(errorString)
{
    return Object.create(Exception(errorString))
};