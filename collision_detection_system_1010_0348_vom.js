// 代码生成时间: 2025-10-10 03:48:22
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

// 定义一个Koa应用
const app = new Koa();

// 使用bodyParser中间件来解析请求体
app.use(bodyParser());

// 定义一个简单的碰撞检测函数
function checkCollision(rect1, rect2) {
  // 检测两个矩形是否重叠
  return !(rect1.x + rect1.width < rect2.x ||
          rect1.x > rect2.x + rect2.width ||
          rect1.y + rect1.height < rect2.y ||
          rect1.y > rect2.y + rect2.height);
}

// 定义一个路由处理函数，用于处理碰撞检测请求
app.use(async (ctx) => {
  // 检查请求方法是否为POST
  if (ctx.method !== 'POST') {
    ctx.status = 405; // 方法不允许
    return;
  }

  // 尝试解析请求体中的矩形数据
  try {
    const { rect1, rect2 } = ctx.request.body;
    // 检查必要的参数是否存在
    if (!rect1 || !rect2 ||
        !rect1.x || !rect1.y || !rect1.width || !rect1.height ||
        !rect2.x || !rect2.y || !rect2.width || !rect2.height) {
      throw new Error('Missing rectangle parameters');
    }

    // 执行碰撞检测
    const collision = checkCollision(rect1, rect2);

    // 返回碰撞检测结果
    ctx.body = {
      collision: collision,
      message: collision ? 'Collision detected' : 'No collision'
    };
  } catch (error) {
    // 错误处理
    ctx.status = 400; // 客户端请求错误
    ctx.body = {
      error: error.message
    };
  }
});

// 设置服务器监听的端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 以下是注释和文档
/*
 * @module CollisionDetectionSystem
 * @description A simple collision detection system using the KOA framework.
 * @version 1.0.0
 *
 * @example
 * // 启动服务后，可以通过POST请求到/detect-collision端点来检测碰撞
 * // 请求体格式：{ rect1: { x: 0, y: 0, width: 10, height: 10 }, rect2: { x: 5, y: 5, width: 10, height: 10 } }
 *
 * @property {function} checkCollision - 碰撞检测函数，接受两个矩形对象作为参数。
 */