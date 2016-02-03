var path = require('path'),
    Api = require('../index');
Api.config = {
    corpid: 'ding2b606c9309e87fcb',
    corpsecret: 'MCwcAMHcH3WacShw9nJWNTyMQHAboBa5KaWtNjFZl9CZhwAUCT_8-q_nJT-YxgYo'
}
var api = require("../lib/api_common");

describe('media', function () {
    it('upload', function (done) {
        return api.media_upload(path.join(__dirname, './media/notify.png')).then(function (result) {
            console.log(result);
        }).then(done, done);
    });
});
