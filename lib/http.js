var https = require("https"),
    Promise = require("bluebird"),
    querystring = require("querystring");

var oapiHost = 'oapi.dingtalk.com';

module.exports = {

    /**
     * 格式化get参数
     * @param query
     * @returns {*}
     */
    params: function (query) {
        if (!query) return '';
        return '?' + querystring.stringify(query);
    },

    /**
     * get请求
     * @param path
     * @param query
     * @returns {*}
     */
    get: function (path, query) {
        var resolver = Promise.pending();
        https.get('https://' + oapiHost + path + this.params(query), function (response) {
            if (response.statusCode === 200) {
                var body = '';
                response.on('data', function (data) {
                    body += data;
                }).on('end', function () {
                    var result = JSON.parse(body);
                    if (result && 0 === result.errcode) {
                        resolver.resolve(result);
                    } else {
                        resolver.reject(result);
                    }
                });
            } else {
                resolver.reject(response.statusCode);
            }
        });
        return resolver.promise;
    },

    /**
     * post请求
     * @param path
     * @param data
     */
    post: function (path, data) {
        var opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            host: oapiHost,
            path: path,
        };
        var resolver = Promise.pending();
        var req = https.request(opt, function (response) {
            if (response.statusCode === 200) {
                var body = '';
                response.on('data', function (data) {
                    body += data;
                }).on('end', function () {
                    var result = JSON.parse(body);
                    if (result && 0 === result.errcode) {
                        resolver.resolve(result);
                    } else {
                        resolver.reject(result);
                    }
                });
            } else {
                resolver.reject(response.statusCode);
            }
        });
        req.write(JSON.stringify(data));
        req.end();
        return resolver.promise;
    }
};