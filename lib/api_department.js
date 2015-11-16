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
    }
};