// const api = require('./api');
import api from './api';
import createFakeData from './createFakeData'

require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;

const app = new Koa();
const router = new Router();

mongoose
.connect(MONGO_URI, {useNewUrlParser: true })
.then(()=> {
    console.log('Connect to MongoDB');
    createFakeData();
})
.catch(e => {
    console.log(e);
});

// 라우터 설정
// router.get('/', ctx=> {
//     ctx.body = '홈';
// });

// 라우터 설정
router.use('/api', api.routes())

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// router.get('/about/:name?', ctx => {
//     const{ name } = ctx.params;
//     // name의 존재 유무에 따라 다른 결과 출력
//     ctx.body = name ? `${name}의 소개` : '소개';
// })

// router.get('/posts', ctx => {
//     const {id} = ctx.query;
//     // id의 존재 유무에 따라 다른 결과 출력
//     ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.'
// })

// router.get('/about', ctx => {
//     ctx.body = '소개';
// })

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// app.use(async (ctx, next) => {
//     console.log(ctx.url);
//     console.log(1)
//     if(ctx.query.authorized !== '1'){
//         ctx.status = 401;
//         return;
//     }

//     await next();
//     console.log('END');
// })

// app.use((ctx, next) =>{
//     console.log(2);
//     next();
// })

// app.use(ctx => {
//     ctx.body = 'hello world';
// })

// 포트가 지정되어 있지 않다면 4000 사용
const port = PORT || 5000;
app.listen(port, () => {
    console.log('Listening to port %d', port);
})
