import React from 'react';
import { createRoot } from 'react-dom/client';
import GraphPage from './GraphPage';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<GraphPage />);
