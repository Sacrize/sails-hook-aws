# Sails Hook Payu

Simple configuration and communication with AWS API in sails.

## Getting Started
Install it via npm:
```bash
npm install sails-hook-aws --save
```
Configure `config/aws.js` in your project:
```javascript
module.exports.aws = {
    // example
    accessKeyId: '',
    secretAccessKey: '',
    // ...
    ssm: {
        region: 'eu-west-1',
        // ...
    },
    sns: {
        region: 'eu-central-1',
        // ...
    },
};
```
Config is for [aws-sdk](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property).

## Available methods
Executing methods with auto initialization:
```javascript
sails.hooks.aws.service().method(params, function (err, data) {
    // process
});
```
or with promise
```javascript
sails.hooks.aws.service().method(params).promise()
    .then(function (data) {
        // process
    })
```
All methods of all services in the official [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/top-level-namespace.html).

## Example
```javascript
sails.hooks.aws.SES().cloneReceiptRuleSet(params).promise()
    .then(function (data) {
        // process
    })
```

## License

[MIT](./LICENSE)
