import express, { Request, Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRoutes from './api/index.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use API routes
router.use('/api', apiRoutes);

// Serve React front-end in production
router.use((_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

export default router;