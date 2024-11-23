import { serve } from '@hono/node-server';
import { Context, Hono } from 'hono';

import configData from '../config/appConfig';

import noteRoutes  from './routes/noteRouter';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

const app = new Hono();

app.use("*", cors());
app.use(logger());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/' + configData.app.api_version + '/notes', noteRoutes);

const port = configData.app.port;
console.log(`Server is running on port ${port}`);

app.onError((err: any, c: Context) => {
  c.status(err.status || 500)
  return c.json({
    success: false,
    status: err.status || 500,
    message: err.message || 'Something went wrong',
    errors: err.errData || null
  });
});

serve({
  fetch: app.fetch,
  port
});
