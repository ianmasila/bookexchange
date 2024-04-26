import express from 'express';
const TestRoutes = express.Router();

TestRoutes.get('/health', async (req, res) => {
  res.json('✅bookexchangeserver healthy');
});

export default TestRoutes;
