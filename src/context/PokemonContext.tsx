import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface PokemonContextType {
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  return (
    <PokemonContext.Provider value={{ selectedTypes, setSelectedTypes }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};
