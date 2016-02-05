var path = require('path'),
    Api = require('../index');
Api.config = {
    corpid: 'ding2b606c9309e87fcb',
    corpsecret: 'MCwcAMHcH3WacShw9nJWNTyMQHAboBa5KaWtNjFZl9CZhwAUCT_8-q_nJT-YxgYo'
}
var api = require("../lib/api_common");

var media_id = '@lALOB54u8c0CAM0CAA';

describe('media', function () {
    it('upload', function (done) {
        return api.media_upload(path.join(__dirname, './media/notify.png')).then(function (result) {
            console.log(result);
        }).then(done, done);
    });
});

describe('microapp', function () {
    it('create', function (done) {
        return api.microapp_create({
            appIcon: media_id,
            appName: '测试微应用',
            appDesc: '测试使用的微应用',
            homepageUrl: 'http://oa.dingtalk.com/?h5'
        }).then(function (result) {
            console.log(result);
        }).then(done, done);
    });
});