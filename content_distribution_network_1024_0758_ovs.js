// 代码生成时间: 2025-10-24 07:58:15
 * This example demonstrates how to serve static files from a directory,
 * which is a basic characteristic of a CDN.
 */

const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');

// Initialize a new Koa application
const app = new Koa();

// Define the directory to serve static files from
const staticDir = path.join(__dirname, 'public');

// Use koa-static middleware to serve static files
app.use(serve(staticDir, {
    // Define cache control headers for optimal CDN performance
    maxage: 365 * 24 * 60 * 60, // Cache for one year
    // Set the immutable header to leverage browser caching
    immutable: true
}));

// Error handling middleware
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        // Log the error
        console.error('Server error:', err);
        // Respond with a 500 Internal Server Error
        ctx.status = err.status || 500;
        ctx.body = 'Internal Server Error';
    }
});

// Define the port to listen on
const port = 3000;

// Start the server
app.listen(port, () => {
    console.log(`CDN server running on http://localhost:${port}`);
});
