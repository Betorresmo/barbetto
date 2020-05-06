import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
import Providers from './hooks';
/* import SignUp from './pages/SignUp'; */

const App: React.FC = () => {
  return (
    <>
      <Providers>
        <SignIn />
      </Providers>

      <GlobalStyle />
    </>
  );
};

export default App;
