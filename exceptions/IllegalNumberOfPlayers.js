var Exception = require('./Exception.js');

exports.IlleagelArgumentException = function(errorString)
{
    return Object.create(Exception(errorString))
};