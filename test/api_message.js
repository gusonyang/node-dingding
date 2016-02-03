var Api = require('../index');
Api.config = {
    corpid: 'ding2b606c9309e87fcb',
    corpsecret: 'MCwcAMHcH3WacShw9nJWNTyMQHAboBa5KaWtNjFZl9CZhwAUCT_8-q_nJT-YxgYo',
    agentid: '7030188'
}
var api = require("../lib/api_message");

describe('message', function () {
    it('oa', function (done) {
        return api.oa({
            "message_url": "http://dingtalk.com",
            "head": {
                "bgcolor": "FFBBBBBB",
                "text": "您有新订货单"
            },
            "body": {
                "title": "订货单号: PSB102222",
                "form": [
                    {
                        "key": "店铺:",
                        "value": "张三"
                    },
                    {
                        "key": "电话:",
                        "value": "20"
                    },
                    {
                        "key": "地址:",
                        "value": "1.8米"
                    },
                    {
                        "key": "备注:",
                        "value": "1.8米"
                    },
                    {
                        "key": "上单时间:",
                        "value": "1.8米"
                    }
                ],
                "rich": {
                    "num": "15.6",
                    "unit": "元"
                }
            }
        }, 'manager3224').then(function (result) {
            console.log(result);
        }).then(done, done);
    });
});


