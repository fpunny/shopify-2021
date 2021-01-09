import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-snapshot';
import { StrictMode } from 'react';
import StyleProvider from './components/StyleProvider/index.jsx';
import reportWebVitals from './reportWebVitals';
import App from './App.jsx';

render(
  <StrictMode>
    <StyleProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StyleProvider>
  </StrictMode>,
  document.getElementById(`root`),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
