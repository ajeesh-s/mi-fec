import { createRoot } from 'react-dom/client';

import { App } from './App';
import './index.css';
//theme
import "primereact/resources/themes/viva-light/theme.css";

//core
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css"
import 'primeicons/primeicons.css';
import { AppProvider } from './context/context';
import React from 'react';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<React.StrictMode>
    <AppProvider>
        <App />
    </AppProvider>
</React.StrictMode>);
