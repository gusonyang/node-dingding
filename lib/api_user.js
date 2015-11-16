var httpUtil = require("./http"),
    common = require('./api_common');

module.exports = {

    /**
     * 获取成员
     * @param userid
     */
    get: function (userid) {
        var path = '/user/get';
        return common.getAccessToken().then(function (result) {
            return httpUtil.get(path, {access_token: result.accessToken, userid: userid});
        }).then(function (result) {
            return result;
        });
    },

    /**
     * 获取部门成员
     * @param department_id
     */
    list: function (department_id) {
        var path = '/user/list';
        return common.getAccessToken().then(function (result) {
            return httpUtil.get(path, {access_token: result.accessToken, department_id: department_id});
        }).then(function (result) {
            return result.userlist;
        });
    },

    /**
     * 创建成员
     * @param user
     */
    create: function (user) {
        var path = '/user/create';
        return common.getAccessToken().then(function (result) {
            return httpUtil.post(path + httpUtil.params({access_token: result.accessToken}), user);
        });
    },

    /**
     * 更新成员
     * @param user
     */
    update: function (user) {
        var path = '/user/update';
        return common.getAccessToken().then(function (result) {
            return httpUtil.post(path + httpUtil.params({access_token: result.accessToken}), user);
        });
    },

    /**
     * 删除成员
     * @param userid
     */
    delete: function (userid) {
        var path = '/user/delete';
        return common.getAccessToken().then(function (result) {
            return httpUtil.get(path, {access_token: result.accessToken, userid: userid});
        });
    }
};