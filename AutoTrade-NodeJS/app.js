'use strict';
const app = require("./server/config/app-config");
const PORT = require("./server/config/constants").port;




app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));