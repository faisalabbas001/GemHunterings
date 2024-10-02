import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AppKitProvider from './BlockChainContext/wagmi.jsx'; // Assuming this is your WAGMI provider
import { AppProvider } from "./context/AppContext.jsx"; // Import your context provider

createRoot(document.getElementById('root')).render(
  <AppKitProvider>
    {/* Wrap the App component with the AppProvider to make context data accessible */}
    <AppProvider>
      <App />
    </AppProvider>
  </AppKitProvider>
);
