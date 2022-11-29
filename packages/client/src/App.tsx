import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from './trpc';
import styled from 'styled-components';
import { GameContextProvider } from './context/GameContext';
import { MainComponent } from './pages/MainComponent';

const client = new QueryClient();

const AppContent = () => {
  return (
    <AppContainer>
      <GameContextProvider>
        <MainComponent />
      </GameContextProvider>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: paleturquoise;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:8080/trpc',
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
