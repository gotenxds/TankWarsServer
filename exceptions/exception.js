
function Exception(errosString)
{
    this.error = errosString;
}

Exception.prototype.printError = function()
{
    console.log(this.error);
};

exports.Exception = Exception;