// 代码生成时间: 2025-10-08 16:38:59
const Koa = require('koa');
const app = new Koa();

// 图的数据结构
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // 添加顶点
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // 添加边
  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      throw new Error('Both vertices must exist in the graph.');
    }
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1); // 如果是无向图
  }

  // 深度优先搜索（DFS）
  dfs(vertex, visited = new Set()) {
    visited.add(vertex);
    console.log(vertex); // 输出访问的顶点

    const neighbors = this.adjacencyList[vertex];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this.dfs(neighbor, visited);
      }
    }
  }

  // 广度优先搜索（BFS）
  bfs(vertex) {
    const queue = [vertex];
    const visited = new Set();
    visited.add(vertex);
    console.log(vertex); // 输出访问的顶点

    while (queue.length) {
      const currentVertex = queue.shift();
      const neighbors = this.adjacencyList[currentVertex];

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          console.log(neighbor); // 输出访问的顶点
          queue.push(neighbor);
        }
      }
    }
  }
}

// 创建图实例
const graph = new Graph();

// 添加顶点
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');

// 添加边
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');
graph.addEdge('B', 'D');

// 路由：执行DFS
app.use(async ctx => {
  if (ctx.path === '/dfs') {
    try {
      graph.dfs('A');
      ctx.body = 'DFS completed';
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal Server Error';
    }
  }
});

// 路由：执行BFS
app.use(async ctx => {
  if (ctx.path === '/bfs') {
    try {
      graph.bfs('A');
      ctx.body = 'BFS completed';
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal Server Error';
    }
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});