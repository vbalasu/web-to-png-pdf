// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

 //const puppeteer = require('puppeteer');
 const chromium = require('chrome-aws-lambda');

 const takeScreenshot = async (url) => {
   //const browser = await puppeteer.launch();
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
   const page = await browser.newPage();
   const options = {
     path: '/tmp/website.png',
     fullPage: true,
     omitBackground: true
   }
   // url = 'https://beaconcha.in/validator/a09f4df1bb542e57dc555011817a127e9f982d1e0259010a432851ec09d7a340e205b300e2da61c06d58465e08af80f1'
   await page.goto(url);
   await page.screenshot(options);
   await page.pdf({'path': '/tmp/website.pdf', 'format': 'letter'});
   await browser.close();
 }


exports.lambdaHandler = async (event, context) => {
    var html;
    try {
        // const ret = await axios(url);
        await takeScreenshot(event.queryStringParameters.url);
        let imageDataURI = require('image-data-uri');
        let res = await imageDataURI.encodeFromFile('/tmp/website.png');
        const datauri = require('datauri');
        let pdf = await datauri('/tmp/website.pdf');
        html = '<img src="' + res + '" width="100%">';
        //html = html + '<object type="application/pdf" width="100%" height="100%" data="' + pdf + '">';
        html = html + '<iframe width="100%" height="100%" src="' + pdf + '"></iframe>';
        response = {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'text/html'
            },
            'body': html
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};
