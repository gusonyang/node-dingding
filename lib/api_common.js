var Promise = require("bluebird"),
    httpUtil = require("./http");

var accessToken;

module.exports = {

    /**
     * 配置
     */
    config: {
        corpid: '',
        corpsecret: ''
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
        return this.getAccessToken().then(function (result) {
            return httpUtil.get(path, {
                type: 'jsapi',
                access_token: result.accessToken
            });
        }).then(function (result) {
            return {ticket: result.ticket};
        });
    }
};