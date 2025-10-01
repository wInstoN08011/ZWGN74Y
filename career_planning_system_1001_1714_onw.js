// 代码生成时间: 2025-10-01 17:14:49
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 定义常量
const PORT = 3000;

// 创建Koa应用实例
const app = new Koa();

// 使用bodyParser中间件，用于解析请求体
app.use(bodyParser());

// 创建Router实例
const router = new Router();

// 职业规划系统的数据存储（示例，实际开发中应使用数据库）
let careerPlans = [];

// 错误处理中间件
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
});

// 获取所有职业规划
router.get('/careerPlans', async (ctx) => {
    ctx.body = careerPlans;
});

// 获取单个职业规划
router.get('/careerPlans/:id', async (ctx) => {
    const { id } = ctx.params;
    const plan = careerPlans.find(p => p.id === parseInt(id));
    if (!plan) {
        ctx.status = 404;
        ctx.body = {
            message: 'Career plan not found'
        };
        return;
    }
    ctx.body = plan;
});

// 添加职业规划
router.post('/careerPlans', async (ctx) => {
    const plan = ctx.request.body;
    if (!plan) {
        ctx.status = 400;
        ctx.body = {
            message: 'Invalid career plan data'
        };
        return;
    }
    plan.id = careerPlans.length + 1; // 简单的ID生成策略
    careerPlans.push(plan);
    ctx.status = 201;
    ctx.body = plan;
});

// 更新职业规划
router.put('/careerPlans/:id', async (ctx) => {
    const { id } = ctx.params;
    const plan = ctx.request.body;
    const index = careerPlans.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: 'Career plan not found'
        };
        return;
    }
    careerPlans[index] = { ...plan, id: parseInt(id) };
    ctx.body = careerPlans[index];
});

// 删除职业规划
router.delete('/careerPlans/:id', async (ctx) => {
    const { id } = ctx.params;
    const index = careerPlans.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: 'Career plan not found'
        };
        return;
    }
    careerPlans.splice(index, 1);
    ctx.status = 204;
    ctx.body = '';
});

// 将路由应用到Koa应用实例
app.use(router.routes()).use(router.allowedMethods());

// 启动Koa应用
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
