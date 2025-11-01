// 代码生成时间: 2025-11-02 07:54:02
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const app = new Koa();

// 用于提取文件元数据的函数
async function extractMetadata(filePath) {
  try {
    // 读取文件状态
    const stats = await fs.promises.stat(filePath);
    // 提取文件的基本信息
    return {
      filePath: filePath,
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      type: stats.isDirectory() ? 'Directory' : 'File',
    };
  } catch (error) {
    // 错误处理
    throw new Error(`Error extracting metadata: ${error.message}`);
  }
}

// 路由处理器，用于处理文件元数据提取请求
app.use(async (ctx) => {
  const { file } = ctx.query;
  if (!file) {
    // 如果没有提供文件参数，则返回错误
    ctx.status = 400;
    ctx.body = {
      error: 'Missing file parameter',
    };
    return;
  }

  try {
    // 尝试提取文件元数据
    const metadata = await extractMetadata(file);
    // 成功提取后，返回文件元数据
    ctx.status = 200;
    ctx.body = metadata;
  } catch (error) {
    // 处理提取过程中的错误
    ctx.status = 500;
    ctx.body = {
      error: error.message,
    };
  }
});

// 服务器监听端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 导出app实例，以便进行测试或进一步的中间件添加
module.exports = app;