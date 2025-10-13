// 代码生成时间: 2025-10-14 02:37:20
const Koa = require('koa');
const Router = require('koa-router');
const { body, validationResult } = require('koa-validation');

// Initialize Koa app
const app = new Koa();
const router = new Router();

// Define a schema for data validation
const dataSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 20,
      message: 'Username must be a string between 3 and 20 characters'
    },
    age: {
      type: 'number',
      required: true,
      minimum: 18,
      maximum: 120,
      message: 'Age must be a number between 18 and 120'
    }
  }
};

// Use koa-validation middleware to validate request body
app.use(body(dataSchema));

// Create a POST route to validate data
router.post('/validate', async (ctx) => {
  try {
    // If there are validation errors, they will be caught here
    const errors = validationResult(ctx);
    if (!errors.isEmpty()) {
      ctx.status = 400;
      ctx.body = {
        error: 'Validation failed',
        details: errors.array()
      };
      return;
    }
    // If no errors, proceed with the request
    ctx.status = 200;
    ctx.body = {
      message: 'Data is valid',
      data: ctx.request.body
    };
  } catch (error) {
    // Handle any unexpected errors
    ctx.status = 500;
    ctx.body = {
      error: 'Internal server error',
      details: error.message
    };
  }
});

// Register the router
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Module exports for testing purposes
module.exports = app;