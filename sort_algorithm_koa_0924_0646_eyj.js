// 代码生成时间: 2025-09-24 06:46:08
const Koa = require('koa');
const app = new Koa();

// 定义一个简单的排序算法：冒泡排序
function bubbleSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }

  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换元素
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// 创建一个路由处理排序请求
app.use(async ctx => {
  // 解析请求体
  try {
    const data = ctx.request.body;
    if (!data || !Array.isArray(data.array)) {
      ctx.status = 400;
      ctx.body = { error: 'Request body must contain an array property.' };
      return;
    }

    // 调用排序算法
    const sortedArray = bubbleSort(data.array);

    // 设置响应状态和返回排序后的数组
    ctx.status = 200;
    ctx.body = { sortedArray };
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

// 监听端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 代码注释：
// - 我们使用Koa框架创建了一个基本的HTTP服务器。
// - 包含了一个冒泡排序算法的实现，它接受一个数组并返回排序后的数组。
// - 有一个路由处理器，它解析请求体中的数组，调用排序算法，并返回排序结果。
// - 错误处理确保了非数组输入和请求体解析错误能够被妥善处理。
// - 服务器监听3000端口，通过控制台日志提供服务启动信息。