import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AppKitProvider from './BlockChainContext/wagmi.jsx'; // Ensure correct path

createRoot(document.getElementById('root')).render(
  <AppKitProvider>
    <App />
  </AppKitProvider>
);
