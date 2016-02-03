var Api = require('../index');
Api.config = {
    corpid: 'ding2b606c9309e87fcb',
    corpsecret: 'MCwcAMHcH3WacShw9nJWNTyMQHAboBa5KaWtNjFZl9CZhwAUCT_8-q_nJT-YxgYo'
}
var api = require("../lib/api_common");

describe('common', function () {
    it('getAccessToken', function (done) {
        return api.getAccessToken().then(function (result) {
            console.log(result);
        }).then(done, done);
    });

    it('getTicket', function (done) {
        return api.getTicket().then(function (result) {
            console.log(result);
        }).then(done, done);
    });

    it('getAuthorizeURL', function () {
        console.log(api.getAuthorizeURL('http://192.168.10.100:1212/ding/ding_notify'));
    });
});
