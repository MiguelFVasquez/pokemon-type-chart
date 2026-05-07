import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonProvider } from './context/PokemonContext';
import Layout from './components/Layout/Layout';
import TypeSelector from './features/search/TypeSelector';
import TypeEffectiveness from './features/comparison/TypeEffectiveness';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonProvider>
        <Layout>
          <TypeSelector />
          <TypeEffectiveness />
        </Layout>
      </PokemonProvider>
    </QueryClientProvider>
  );
}

export default App;
