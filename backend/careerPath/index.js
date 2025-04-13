const express = require('express');
require('dotenv').config();
const cors = require('cors');
const promClient = require('prom-client'); // Prometheus client
const leadProfileRoutes = require('./routes/leadsProfile.route');
const leadOutcomeRoutes = require('./routes/leadsOutcome.route');

// Create a new Prometheus registry
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Metrics: total HTTP requests
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests made',
  labelNames: ['method', 'route', 'status'],
});
register.registerMetric(httpRequestsTotal);

// Metrics: request duration
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 1.5, 2, 5]
});
register.registerMetric(httpRequestDurationMicroseconds);

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Middleware to track metrics for every request
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();

  res.on('finish', () => {
    const route = req.route?.path || req.originalUrl || 'unknown';
    const method = req.method;
    const status = res.statusCode;

    httpRequestsTotal.inc({ method, route, status });
    end({ method, route, status });
  });

  next();
});

// API routes
app.use('/api/leads', leadProfileRoutes);
app.use('/api/outcomes', leadOutcomeRoutes);

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Test endpoint
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(3003, () => {
  console.log('Server started at port 3003');
});
