var Promise = require("bluebird"),
    crypto = require('crypto'),
    httpUtil = require("./http"),
    querystring = require("querystring");

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
     * 删除
     */
    cleanAccessToken: function () {
        accessToken = null;
    },

    /**
     * 获取AccessToken
     * @returns {*}
     */
    getAccessToken: function (refreshToken) {
        var path = '/gettoken';
        if (!refreshToken && accessToken) return Promise.resolve({accessToken: accessToken});

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
    },

    /**
     * 获取授权Url
     * @param url
     */
    getAuthorizeURL: function (redirect_uri) {
        var url = 'https://oapi.dingtalk.com/connect/oauth2/authorize';
        var info = {
            appid: api.config.corpid,
            redirect_uri: redirect_uri,
            response_type: 'code',
            scope: 'SCOPE',
            state: 'STATE'
        };
        return url + '?' + querystring.stringify(info);
    }
};

/**
 * 更新刷新AccessToken
 */
setInterval(function () {
    api.getAccessToken(true);
}, 1000 * 60 * 30);

module.exports = api;