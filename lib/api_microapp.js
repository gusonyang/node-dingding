var httpUtil = require("./http"),
    common = require('./api_common');

module.exports = {

    /**
     * 创建微应用
     */
    microapp_create: function (app) {
        var path = '/microapp/create';
        return common.getAccessToken().then(function (result) {
            return httpUtil.post(path + httpUtil.params({access_token: result.accessToken}), app);
        });
    }

};