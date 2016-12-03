'use strict';
const app = require("./server/config/app-config");
const PORT = require("./server/config/constants").port;
require('./server/routers/rest-api-router')(app);

const fs = require("fs"),
    path = require("path");





app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));