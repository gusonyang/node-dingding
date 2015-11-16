var Api = require('../index');
Api.config = {
    corpid: 'dinge4c29b05af0e60d2',
    corpsecret: 'ELMCL6RXJB_V8zub57nrilxizh7605Xzgk7yW_QejS0EHnAHDuZ7pF_BhN_t8TGa'
}

var api = require("../lib/api_user");

/*
 api.user_list(1).then(function (rows) {
 console.log(rows);
 });
 */

/*
api.user_create({
    userid: 2,
    name: '张三',
    position: '加盟店主',
    department: [1],
    mobile: '13510946318'
}).then(function (rows) {
    console.log(rows);
}, function(err){
    console.log(err);
});
*/

/*
api.user_update({
    userid: 1,
    name: '张三',
    position: '加盟店主',
    department: [1],
    mobile: '13510946318'
}).then(function (rows) {
    console.log(rows);
}, function(err){
    console.log(err);
});
*/

api.user_delete(1).then(function (rows) {
    console.log(rows);
}, function(err){
    console.log(err);
});