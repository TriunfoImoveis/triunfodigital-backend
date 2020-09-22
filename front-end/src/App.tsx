import React from 'react';

import GlobalStyle from './styles/global';
// import SignIn from './pages/SignIn';
import Action from './pages/Action';

const App: React.FC = () => {
  return (
    <>
      {/* <SignIn /> */}
      <Action />
      <GlobalStyle />
    </>
  );
};

export default App;
