const express = require('express');
require('dotenv').config();
const cors = require('cors');
const promClient = require('prom-client'); // Import prom-client for metrics
const leadProfileRoutes = require('./routes/leadsProfile.route');
const leadOutcomeRoutes = require('./routes/leadsOutcome.route');

// Create a registry for Prometheus
const register = new promClient.Registry();

// Create a metric to track HTTP requests
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests made',
  labelNames: ['method', 'route', 'status'],
});

register.registerMetric(httpRequestsTotal);

// Create an endpoint for Prometheus to scrape metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register });

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/leads', leadProfileRoutes);
app.use('/api/outcomes', leadOutcomeRoutes);

// Expose metrics at /metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(3003, () => {
  console.log('Server Started at 3003');
});
