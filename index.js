var _ = require('lodash'),
    API = require('./lib/api_common');

_.assign(API, require('./lib/api_department'));
_.assign(API, require('./lib/api_user'));
_.assign(API, require('./lib/api_message'));
_.assign(API, require('./lib/api_media'));
_.assign(API, require('./lib/api_microapp'));

module.exports = API;
