import './app.styles.scss';

import { RouterProvider } from '@tanstack/react-router';
import { App, ConfigProvider, theme } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { router } from './router.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}>
      <App>
        <RouterProvider router={router} />
      </App>
    </ConfigProvider>
  </React.StrictMode>,
);
