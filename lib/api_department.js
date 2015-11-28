var httpUtil = require("./http"),
    common = require('./api_common');

module.exports = {

    /**
     * 获取部门列表
     */
    department_list: function () {
        var path = '/department/list';
        return common.getAccessToken().then(function (result) {
            return httpUtil.get(path, {access_token: result.accessToken});
        }).then(function (result) {
            return result.department;
        });
    },

    /**
     * 创建部门
     * @param department
     */
    department_create: function (department) {
        var path = '/department/create';
        return common.getAccessToken().then(function (result) {
            return httpUtil.post(path + httpUtil.params({access_token: result.accessToken}), department);
        });
    },

    /**
     * 更新部门
     * @param department
     */
    department_update: function (department) {
        var path = '/department/update';
        return common.getAccessToken().then(function (result) {
            return httpUtil.post(path + httpUtil.params({access_token: result.accessToken}), department);
        });
    },

    /**
     * 删除部门
     * @param id
     */
    department_delete: function (id) {
        var path = '/department/delete';
        return common.getAccessToken().then(function (result) {
            return httpUtil.get(path, {access_token: result.accessToken, id: id});
        });
    }

};