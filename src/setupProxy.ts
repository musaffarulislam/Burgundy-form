import { createProxyMiddleware } from 'http-proxy-middleware';
import { Express } from 'express';

export default function setupProxy(app: Express) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://control.msg91.com/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', 
      },
    })
  );
}