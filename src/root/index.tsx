import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/root/i18n';
import { Router } from '@/root/router';
import '@/styles/index.css';
const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

createRoot(container).render(
    <StrictMode>
        <Router />
    </StrictMode>
);
