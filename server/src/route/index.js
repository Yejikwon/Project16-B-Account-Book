const Router = require('koa-router');
const userRouter = require('./user.route');

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'index 입니다';
});
router.use('/user', userRouter.routes());

module.exports = router;
