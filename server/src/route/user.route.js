const Router = require('koa-router');
const router = new Router();
const userController = require('../controller/user.controller');

router.get('/', userController.test);
router.post('/', userController.update);

module.exports = router;
