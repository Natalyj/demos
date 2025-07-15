import ReactDOM from 'react-dom/client';

import App from './App.tsx';

const rootElement = document.getElementById('root');
if (rootElement !== null) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
