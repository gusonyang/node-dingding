var httpUtil = require("./http"),
    common = require('./api_common');

module.exports = {

    /**
     * 获取部门列表
     */
    media_upload: function (filePath) {
        var path = '/media/upload';
        return common.getAccessToken().then(function (result) {
            return httpUtil.upload(path, {access_token: result.accessToken, type: 'image'}, filePath);
        }).then(function (result) {
            return result;
        });
    }

};