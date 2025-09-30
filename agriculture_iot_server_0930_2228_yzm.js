// 代码生成时间: 2025-09-30 22:28:45
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// Create a new Koa instance.
const app = new Koa();

// Create a new Router instance.
const router = new Router();

// Use body parser to handle JSON bodies
app.use(bodyParser());

// Define the endpoint to receive IoT data.
router.post('/data', async (ctx) => {
  try {
    // Extract IoT data from the request body.
    const { sensorId, temperature, humidity } = ctx.request.body;
    
    // Validate the data.
    if (!sensorId || typeof temperature !== 'number' || typeof humidity !== 'number') {
      throw new Error('Invalid data format.');
    }
    
    // Process the IoT data (e.g., store or analyze it).
    // This is a placeholder for actual data processing logic.
    console.log(`Received data from sensor ${sensorId}: Temperature: ${temperature}, Humidity: ${humidity}`);
    
    // Send a success response.
    ctx.status = 200;
    ctx.body = {
      message: 'Data received successfully.',
      sensorId,
      temperature,
      humidity
    };
  } catch (error) {
    // Handle any errors that occur during data processing.
    ctx.status = 400;
    ctx.body = {
      message: 'Failed to process data.',
      error: error.message
    };
  }
});

// Register the routes.
app.use(router.routes()).use(router.allowedMethods());

// Start the server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Agriculture IoT server listening on port ${PORT}`);
});
