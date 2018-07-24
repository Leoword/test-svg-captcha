'use strict';

const Koa = require('koa');
const svgCaptcha = require('svg-captcha');
const session = require('koa-session');

const app = new Koa();

app.keys = ['some secret hurr'];

app.use(session({
    key: 'koa:sess'
}, app));


// app.use(async ctx => {
//     ctx.body = 'Hello World';
//   });

// app.use(async ctx => {
//     const captcha = svgCaptcha({
//         width: 200,
//         height: 400,
//         background: 'black'
//     });
    
// 	ctx.session.captcha = captcha.text;
	
// 	ctx.res.type = 'image/svg+xml';
//     ctx.res.status = 200;
    
//     ctx.body = captcha.data;
// });

app.use(async ctx => {
    const captcha = svgCaptcha.create({
        width: 200,
        height: 400,
        background: 'black'
    });

    // captcha.generate();

	ctx.session.captcha = captcha.text;
	
	ctx.res.type = 'image/svg+xml';
    ctx.res.status = 200;
    
    ctx.body = captcha.data;
});

app.listen(8200);