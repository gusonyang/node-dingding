var Api = require('../index');
Api.config = {
    corpid: 'ding2b606c9309e87fcb',
    corpsecret: 'MCwcAMHcH3WacShw9nJWNTyMQHAboBa5KaWtNjFZl9CZhwAUCT_8-q_nJT-YxgYo'
}
var api = require("../lib/api_user");

describe('user', function () {
    it('get', function (done) {
        return api.user_get(26671419214).then(function (rows) {
            console.log(rows);
        }, function (err) {
            console.log(err.message);
        }).then(done, done);
    });

    it('list', function (done) {
        return api.user_list(1).then(function (rows) {
            console.log(rows);
        }).then(done, done);
    });

    it('create', function (done) {
        return api.user_create({
                userid: 2,
                name: 'HaleyWang',
                position: '用户',
                department: [1],
                mobile: '13510946317'
            }
        ).then(function (rows) {
            console.log(rows);
        }).then(done, done);
    });

    it('update', function (done) {
        return api.user_update({
            userid: 1,
            name: '张三',
            position: '加盟店主',
            department: [1],
            mobile: '13510946318'
        }).then(function (rows) {
            console.log(rows);
        }).then(done, done);
    });

    it('delete', function (done) {
        return api.user_delete(1).then(function (rows) {
            console.log(rows);
        }).then(done, done);
    });
});