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
        if (!self['AWS' + service]) {
            self['AWS' + service] = new AWS[service]();
        }
        return self['AWS' + service];
    }
}
