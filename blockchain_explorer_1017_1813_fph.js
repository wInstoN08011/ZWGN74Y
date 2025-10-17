// 代码生成时间: 2025-10-17 18:13:50
const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 区块链浏览器服务
class BlockchainExplorerService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  // 获取区块信息
  async getBlock(blockHeight) {
    try {
      const response = await axios.get(`${this.apiUrl}/blocks/${blockHeight}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get block: ${error.message}`);
    }
  }

  // 获取交易信息
  async getTransaction(txId) {
    try {
      const response = await axios.get(`${this.apiUrl}/transactions/${txId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get transaction: ${error.message}`);
    }
  }
}

// 实例化区块链浏览器服务
const blockchainExplorer = new BlockchainExplorerService('https://api.example.com');

// 定义路由
router.get('/blocks/:blockHeight', async (ctx) => {
  try {
    const block = await blockchainExplorer.getBlock(ctx.params.blockHeight);
    ctx.body = {
      status: 'success',
      data: block,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      message: error.message,
    };
  }
});

router.get('/transactions/:txId', async (ctx) => {
  try {
    const transaction = await blockchainExplorer.getTransaction(ctx.params.txId);
    ctx.body = {
      status: 'success',
      data: transaction,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      message: error.message,
    };
  }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Blockchain Explorer running on port ${PORT}`);
});