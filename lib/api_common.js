var Promise = require("bluebird"),
    crypto = require('crypto'),
    httpUtil = require("./http");

var accessToken, api = {

    /**
     * 配置
     */
    config: {
        corpid: '',
        corpsecret: '',
        agentid: ''
    },

    /**
     * 获取AccessToken
     * @returns {*}
     */
    getAccessToken: function () {
        var path = '/gettoken';
        if (accessToken) return Promise.resolve({accessToken: accessToken});

        return httpUtil.get(path, this.config).then(function (result) {
            accessToken = result.access_token;
            return {accessToken: accessToken};
        });
    },

    /**
     * 获取jsapi_ticket
     */
    getTicket: function () {
        var path = '/get_jsapi_ticket';
        return api.getAccessToken().then(function (result) {
            return httpUtil.get(path, {
                type: 'jsapi',
                access_token: result.accessToken
            });
        });
    },

    /**
     * 签名
     */
    getJsapiSign: function (params) {
        var plain = 'jsapi_ticket=' + params.ticket + '&noncestr=' + params.nonceStr + '&timestamp=' + params.timeStamp + '&url=' + params.url;
        var sha1 = crypto.createHash('sha1');
        sha1.update(plain, 'utf8');
        return sha1.digest('hex');
    },

    /**
     * 签名
     */
    getSign: function (url) {
        return api.getTicket().then(function (result) {
            var params = {
                corpId: api.config.corpid,
                nonceStr: 'abcdefg',
                timeStamp: new Date().getTime(),
                url: decodeURIComponent(url),
                ticket: result.ticket,
            }
            params.signature = api.getJsapiSign(params);
            return params;
        })
    }
};

module.exports = api;