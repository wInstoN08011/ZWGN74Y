// 代码生成时间: 2025-10-15 18:16:02
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const chokidar = require('chokidar');

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 定义被监控的文件路径
const FILE_TO_WATCH = './watched_file.txt';

// 文件变更通知路由
router.get('/file-changed', async (ctx) => {
  ctx.body = 'File change detected!';
});

// 启动文件监控
const watcher = chokidar.watch(FILE_TO_WATCH, {
  persistent: true,
});

// 添加文件变更事件监听
watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on('change', path => {
    console.log(`File ${path} has been changed`);
    // 在这里可以添加发送通知的代码，比如调用上面的路由
    // app.use('/file-changed', router.routes());
  })
  .on('unlink', path => console.log(`File ${path} has been removed`))
  .on('error', error => console.error(`Watcher error: ${error}`));

// 使用路由
app.use(router.routes());

// 监听端口启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
    console.error('Server error:', err);
  }
});
