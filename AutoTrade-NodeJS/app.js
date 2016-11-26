/* globals require console */

const config = require("./server/config/constants");

const app = require("./server/config/application");

const models = require('./server/models')

const data = require("./server/data")(config, models);

app.get("/", (req, res) => { res.send("It works"); })

//require("./routers")(app, data);

app.listen(config.port, () => console.log(`Running at :${config.port}`));