
function Exception(errorString, name)
{
    this.name = "";
    this.error = errorString;
}

Exception.prototype.printError = function()
{
    console.log(this.name + "-:-" + this.error);
};

exports.Exception = Exception;