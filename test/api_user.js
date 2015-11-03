var api = require("../lib/api_user");

api.list(1).then(function (rows) {
    console.log(rows);
});
