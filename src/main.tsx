import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if (typeof window !== 'undefined') {
  document.documentElement.lang = 'en-US';
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
