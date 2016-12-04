'use strict';
const app = require("./server/config/app-config");
const PORT = require("./server/config/constants").port;

const config = require("./server/config/constants");

const models = require("./server/models")();

const data = require("./server/data/index")(config, models);

const controller = require("./server/controllers")(data);

require('./server/routers')({ app, data, controller });


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));