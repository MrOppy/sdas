import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDiscord, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import App from './App.tsx';
import './index.css';

// Add FontAwesome icons to library
library.add(faDiscord, faFacebook, faInstagram, faYoutube);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);