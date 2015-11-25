var httpUtil = require("./http"),
    common = require('./api_common');

module.exports = {

    /**
     * text消息
     * @param content
     */
    text: function (content, touser, toparty, agentid) {
        var path = '/message/send';
        return common.getAccessToken().then(function (result) {
            return httpUtil.post(path + httpUtil.params({access_token: result.accessToken}), {
                "touser": touser || '@all',
                "toparty": toparty || '@all',
                "agentid": agentid || common.config.agentid,
                "msgtype": "text",
                "text": {"content": content}
            });
        });
    },

    /**
     * oa 消息
     * @param content
     */
    oa: function (oa, touser, toparty, agentid) {
        var path = '/message/send';
        return common.getAccessToken().then(function (result) {
            return httpUtil.post(path + httpUtil.params({access_token: result.accessToken}), {
                "touser": touser || '@all',
                "toparty": toparty || '@all',
                "agentid": agentid || common.config.agentid,
                "msgtype": "oa",
                "oa": oa
            });
        });
    }

};