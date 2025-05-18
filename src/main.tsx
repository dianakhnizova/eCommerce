import { createRoot } from 'react-dom/client';
import './global.module.css';
import { App } from './app';

createRoot(document.getElementById('root')!).render(<App />);
