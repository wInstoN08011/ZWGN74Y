// 代码生成时间: 2025-10-27 04:45:19
const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

// 创建一个新的Koa应用实例
const app = new Koa();

// 创建路由器
const router = new Router();

// 定义社交媒体数据模型
const socialMediaData = {
    // 示例数据
    posts: []
};

// 获取所有帖子
router.get('/posts', async (ctx) => {
    try {
        ctx.body = socialMediaData.posts;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
});

// 创建新帖子
router.post('/posts', async (ctx) => {
    const { content } = ctx.request.body;
    try {
        if (!content) {
            throw new Error('Content is required');
        }
        const post = { content, timestamp: new Date() };
        socialMediaData.posts.push(post);
        ctx.status = 201;
        ctx.body = post;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
});

// 错误处理中间件
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = { error: error.message };
        console.error('Server error', error);
    }
});

// 使用bodyparser中间件解析请求体
app.use(bodyparser());

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听3000端口
app.listen(3000, () => {
    console.log('Social Media Manager is running on port 3000');
});

// 代码注释解释：
// 1. 引入Koa框架和相关中间件
// 2. 创建Koa应用实例和路由器
// 3. 定义一个简单的社交媒体数据模型
// 4. 定义路由处理函数，用于获取和创建帖子
// 5. 实现错误处理中间件，以便在请求处理过程中捕获和处理错误
// 6. 使用bodyparser中间件解析请求体，以便可以直接访问请求体中的数据
// 7. 使用路由并监听3000端口启动应用
