// 代码生成时间: 2025-10-03 02:01:20
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 创建一个Koa实例
const app = new Koa();

// 创建路由实例
const router = new Router();

// 密钥管理服务
class KeyManagementService {
  constructor() {
    this.keys = [];
  }

  // 生成新的密钥
  generateKey() {
    const key = Date.now().toString(36) + Math.random().toString(36).substr(2);
    this.keys.push(key);
    return key;
  }

  // 验证密钥
  verifyKey(key) {
    return this.keys.includes(key);
  }
}

// 实例化密钥管理服务
const keyService = new KeyManagementService();

// POST /key - 创建一个新密钥
router.post('/key', async (ctx) => {
  try {
    const key = keyService.generateKey();
    ctx.body = { key };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// GET /key/:id - 验证密钥
router.get('/key/:id', async (ctx) => {
  try {
    const key = ctx.params.id;
    if (keyService.verifyKey(key)) {
      ctx.status = 200;
      ctx.body = { verified: true, key };
    } else {
      ctx.status = 404;
      ctx.body = { verified: false, error: 'Key not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// 使用bodyParser中间件
app.use(bodyParser());

// 使用路由
app.use(router.routes());
app.use(router.allowedMethods());

// 服务器监听3000端口
app.listen(3000, () => {
  console.log('Key Management Service is running on port 3000');
});