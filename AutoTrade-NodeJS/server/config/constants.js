const connectionString = "mongodb://nodejsteame:teamenode2016@ds042459.mlab.com:42459/autotrade",
    port = 3001,
    path = require("path"),
    rootPath = path.normalize(__dirname + "/../../");

module.exports = {
    connectionString: connectionString,
    port: port,
    rootPath: rootPath
};