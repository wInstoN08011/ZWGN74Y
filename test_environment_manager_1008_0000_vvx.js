// 代码生成时间: 2025-10-08 00:00:35
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 创建Koa实例
const app = new Koa();

// 创建Router实例
const router = new Router();

// 使用bodyParser中间件解析请求体
app.use(bodyParser());

// 测试环境配置对象
let testEnvironments = {
  'env1': {
    'name': 'Test Environment 1',
    'status': 'active',
    'configuration': {
      'host': 'localhost',
      'port': 8080
    }
  },
  'env2': {
    'name': 'Test Environment 2',
    'status': 'inactive',
    'configuration': {
      'host': 'localhost',
      'port': 8081
    }
  }
};

// 获取所有测试环境
router.get('/test-environments', async (ctx) => {
  try {
    ctx.ok({ environments: testEnvironments });
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// 获取指定测试环境
router.get('/test-environments/:id', async (ctx) => {
  const { id } = ctx.params;
  try {
    const env = testEnvironments[id];
    if (env) {
      ctx.ok({ environment: env });
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Environment not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// 更新测试环境
router.put('/test-environments/:id', async (ctx) => {
  const { id } = ctx.params;
  const { body } = ctx.request;
  try {
    if (testEnvironments[id]) {
      const updatedEnv = {
        ...testEnvironments[id],
        ...body
      };
      testEnvironments[id] = updatedEnv;
      ctx.ok({ environment: updatedEnv });
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Environment not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// 删除测试环境
router.delete('/test-environments/:id', async (ctx) => {
  const { id } = ctx.params;
  try {
    if (testEnvironments[id]) {
      delete testEnvironments[id];
      ctx.status = 204;
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Environment not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// 使用Router中间件
app.use(router.routes()).use(router.allowedMethods());

// 设置监听端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});