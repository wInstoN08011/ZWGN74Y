// 代码生成时间: 2025-09-23 14:03:23
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');

// Create a new Koa application
const app = new Koa();
const router = new Router();

// Serve static files from the 'public' directory
app.use(serve(path.join(__dirname, 'public')));

// Define a route for the responsive layout
router.get('/layout', async (ctx) => {
  try {
    // Set the view file path
    const viewFilePath = path.join(__dirname, 'views', 'responsive_layout.html');
    
    // Send the view file as the response
    ctx.body = await ctx.render('responsive_layout', {
      title: 'Responsive Layout Example'
    });
  } catch (error) {
    // Handle errors and send a 500 error response
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
});

// Add the route to the Koa application
app.use(router.routes());
app.use(router.allowedMethods());

// Define the port and start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Export the app for testing purposes
module.exports = app;