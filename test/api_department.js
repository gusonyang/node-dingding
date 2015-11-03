var api = require("../lib/api_department");

api.list().then(function (rows) {
    console.log(rows);
});
