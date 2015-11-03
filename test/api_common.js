var api = require("../lib/api_common");

api.getAccessToken().then(function (result) {
    console.log(result);
});

api.getTicket().then(function (result) {
    console.log(result);
});

