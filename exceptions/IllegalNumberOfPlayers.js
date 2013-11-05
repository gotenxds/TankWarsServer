var Exception = require('./Exception.js').Exception;

exports.IlleagelArgumentException = function(errorString)
{
    return Object.create(Exception(errorString))
};