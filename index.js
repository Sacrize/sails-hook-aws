const AWS = require('aws-sdk');

module.exports = function (sails) {

    return {
        defaults: {
            __configKey__: {
                accessKeyId: '',
                secretAccessKey: '',
            }
        },
        configure() {
            Object.assign(AWS.config, sails.config[this.configKey]);
        },
        initialize() {
            let self = this;
            sails.log.info('Initializing hook (`sails-hook-aws`)');
            for (let service of Object.keys(AWS)) {
                if (typeof AWS[service] === 'function') {
                    self[service] = function () {
                        return _initOnce(self, service);
                    }
                }
            }
        },
        AWS,
    }
    function _initOnce(self, service) {
        let name = '_' + service;
        if (!self[name]) {
            self[name] = new AWS[service]();
        }
        return self[name];
    }
}
