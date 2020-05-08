import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Providers from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <Providers>
        <Routes />
      </Providers>

      <GlobalStyle />
    </Router>
  );
};

export default App;
