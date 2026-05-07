import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonProvider } from './context/PokemonContext';
import Layout from './components/Layout/Layout';
import TypeSelector from './features/search/TypeSelector';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonProvider>
        <Layout>
          <TypeSelector />
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p>Welcome to the Pokemon Type Chart! Select a type above to see its effectiveness.</p>
          </div>
        </Layout>
      </PokemonProvider>
    </QueryClientProvider>
  );
}

export default App;
