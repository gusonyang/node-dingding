var httpUtil = require("./http"),
    common = require('./api_common');

module.exports = {

    /**
     * text消息
     * @param content
     */
    text: function (agentid, content, touser, toparty) {
        var path = '/message/send';
        return common.getAccessToken().then(function (result) {
            return httpUtil.post(path + httpUtil.params({access_token: result.accessToken}), {
                "touser": touser || '@all',
                "toparty": toparty || '@all',
                "agentid": agentid,
                "msgtype": "text",
                "text": {"content": content}
            });
        }).then(function (result) {
            return result;
        });
    }

};