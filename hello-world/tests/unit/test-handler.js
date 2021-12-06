'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

// Event generated using `sam local generate-event apigateway aws-proxy >event.json`
// Set url to 'https://beaconcha.in/validator/a09f4df1bb542e57dc555011817a127e9f982d1e0259010a432851ec09d7a340e205b300e2da61c06d58465e08af80f1'
event = {
    "body": "eyJ0ZXN0IjoiYm9keSJ9",
    "resource": "/{proxy+}",
    "path": "/path/to/resource",
    "httpMethod": "POST",
    "isBase64Encoded": true,
    "queryStringParameters": {
      "url": "https://beaconcha.in/validator/a09f4df1bb542e57dc555011817a127e9f982d1e0259010a432851ec09d7a340e205b300e2da61c06d58465e08af80f1"
    },
    "multiValueQueryStringParameters": {
      "foo": [
        "bar"
      ]
    },
    "pathParameters": {
      "proxy": "/path/to/resource"
    },
    "stageVariables": {
      "baz": "qux"
    },
    "headers": {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, sdch",
      "Accept-Language": "en-US,en;q=0.8",
      "Cache-Control": "max-age=0",
      "CloudFront-Forwarded-Proto": "https",
      "CloudFront-Is-Desktop-Viewer": "true",
      "CloudFront-Is-Mobile-Viewer": "false",
      "CloudFront-Is-SmartTV-Viewer": "false",
      "CloudFront-Is-Tablet-Viewer": "false",
      "CloudFront-Viewer-Country": "US",
      "Host": "1234567890.execute-api.us-east-1.amazonaws.com",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Custom User Agent String",
      "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)",
      "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==",
      "X-Forwarded-For": "127.0.0.1, 127.0.0.2",
      "X-Forwarded-Port": "443",
      "X-Forwarded-Proto": "https"
    },
    "multiValueHeaders": {
      "Accept": [
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
      ],
      "Accept-Encoding": [
        "gzip, deflate, sdch"
      ],
      "Accept-Language": [
        "en-US,en;q=0.8"
      ],
      "Cache-Control": [
        "max-age=0"
      ],
      "CloudFront-Forwarded-Proto": [
        "https"
      ],
      "CloudFront-Is-Desktop-Viewer": [
        "true"
      ],
      "CloudFront-Is-Mobile-Viewer": [
        "false"
      ],
      "CloudFront-Is-SmartTV-Viewer": [
        "false"
      ],
      "CloudFront-Is-Tablet-Viewer": [
        "false"
      ],
      "CloudFront-Viewer-Country": [
        "US"
      ],
      "Host": [
        "0123456789.execute-api.us-east-1.amazonaws.com"
      ],
      "Upgrade-Insecure-Requests": [
        "1"
      ],
      "User-Agent": [
        "Custom User Agent String"
      ],
      "Via": [
        "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)"
      ],
      "X-Amz-Cf-Id": [
        "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA=="
      ],
      "X-Forwarded-For": [
        "127.0.0.1, 127.0.0.2"
      ],
      "X-Forwarded-Port": [
        "443"
      ],
      "X-Forwarded-Proto": [
        "https"
      ]
    },
    "requestContext": {
      "accountId": "123456789012",
      "resourceId": "123456",
      "stage": "prod",
      "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef",
      "requestTime": "09/Apr/2015:12:34:56 +0000",
      "requestTimeEpoch": 1428582896000,
      "identity": {
        "cognitoIdentityPoolId": null,
        "accountId": null,
        "cognitoIdentityId": null,
        "caller": null,
        "accessKey": null,
        "sourceIp": "127.0.0.1",
        "cognitoAuthenticationType": null,
        "cognitoAuthenticationProvider": null,
        "userArn": null,
        "userAgent": "Custom User Agent String",
        "user": null
      },
      "path": "/prod/path/to/resource",
      "resourcePath": "/{proxy+}",
      "httpMethod": "POST",
      "apiId": "1234567890",
      "protocol": "HTTP/1.1"
    }
  }
  

describe('Tests index', function () {
    it('verifies successful response', async () => {
        expect(event.queryStringParameters.url).to.be.an('string');
        const result = await app.lambdaHandler(event, context)
        console.log(result);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');
        expect(result.headers['Content-Type']).to.be.equal('text/html');

        //let response = JSON.parse(result.body);

        //expect(response).to.be.an('object');
        //expect(response.image).to.be.an('string');
        // expect(response.location).to.be.an("string");
    });
});
