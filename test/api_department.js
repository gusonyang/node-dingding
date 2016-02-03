var Api = require('../index');
Api.config = {
    corpid: 'ding2b606c9309e87fcb',
    corpsecret: 'MCwcAMHcH3WacShw9nJWNTyMQHAboBa5KaWtNjFZl9CZhwAUCT_8-q_nJT-YxgYo'
}
var api = require("../lib/api_department");

describe('department', function () {
    it('create', function (done) {
        return api.department_create({
            "name": "来往事业部",
            "parentid": "1",
            "order": "1",
            "createDeptGroup": true
        }).then(function (result) {
            console.log(result);
        }).then(done, done);
    });

    it('delete', function (done) {
        return api.department_delete(3582591).then(function (result) {
            console.log(result);
        }).then(done, done);
    });

    it('update', function () {
        return api.department_update({
            id: 3589485,
            name: '测试'
        }).then(function (result) {
            console.log(result);
        }).then(done, done);
    });

    it('list', function () {
        return api.department_list().then(function (result) {
            console.log(result);
        }).then(done, done);
    });
});