var fs = require('fs'),
    _path = require('path'),
    https = require("https"),
    Promise = require("bluebird"),
    querystring = require("querystring"),
    formstream = require('formstream');

var oapiHost = 'oapi.dingtalk.com';

var api = {

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
        return new Promise(function (resolve, reject) {
            console.log('https://' + oapiHost + path + api.params(query));
            https.get('https://' + oapiHost + path + api.params(query), function (response) {
                if (response.statusCode === 200) {
                    var body = '';
                    response.on('data', function (data) {
                        body += data;
                    }).on('end', function () {
                        var result = JSON.parse(body);
                        if (result && 0 === result.errcode) {
                            resolve(result);
                        } else {
                            if (result.errcode == 40014) {
                                require('./api_common').cleanAccessToken();
                            }
                            reject(new Error(body));
                        }
                    });
                } else {
                    reject(new Error(response.statusCode));
                }
            });
        });
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
        return new Promise(function (resolve, reject) {
            var req = https.request(opt, function (response) {
                if (response.statusCode === 200) {
                    var body = '';
                    response.on('data', function (data) {
                        body += data;
                    }).on('end', function () {
                        var result = JSON.parse(body);
                        if (result && 0 === result.errcode) {
                            resolve(result);
                        } else {
                            if (result.errcode == 40014) {
                                require('./api_common').cleanAccessToken();
                            }
                            reject(new Error(body));
                        }
                    });
                } else {
                    reject(new Error(response.statusCode));
                }
            });
            req.write(JSON.stringify(data));
            req.end();
        });
    },

    /**
     * 上传
     * @param path
     * @param query
     * @param filepath
     * @returns {bluebird|exports|module.exports}
     */
    upload: function (path, query, filepath) {
        return new Promise(function (resolve, reject) {
            fs.stat(filepath, function (err, stat) {
                if (err) {
                    return reject(err);
                }
                var form = formstream();
                form.file('media', filepath, _path.basename(filepath), stat.size);
                var opt = {
                    method: 'POST',
                    headers: form.headers(),
                    host: oapiHost,
                    path: path + api.params(query),
                };
                var req = https.request(opt, function (response) {
                    if (response.statusCode === 200) {
                        var body = '';
                        response.on('data', function (data) {
                            body += data;
                        }).on('end', function () {
                            var result = JSON.parse(body);
                            if (result && 0 === result.errcode) {
                                resolve(result);
                            } else {
                                if (result.errcode == 40014) {
                                    require('./api_common').cleanAccessToken();
                                }
                                reject(new Error(body));
                            }
                        });
                    } else {
                        reject(new Error(response.statusCode));
                    }
                });
                form.pipe(req);
            });
        });
    }
};

module.exports = api;