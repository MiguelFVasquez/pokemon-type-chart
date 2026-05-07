import React, { useState, useEffect } from 'react';
import { useTypes } from '../../hooks/usePokemonData';
import { usePokemonContext } from '../../context/PokemonContext';
import styles from './TypeSelector.module.css';

const TypeSelector: React.FC = () => {
  const { data: types, isLoading, error } = useTypes();
  const { selectedTypes, setSelectedTypes } = usePokemonContext();
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  useEffect(() => {
    if (showLimitWarning) {
      const timer = setTimeout(() => setShowLimitWarning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showLimitWarning]);

  const handleTypeClick = (typeName: string) => {
    if (selectedTypes.includes(typeName)) {
      setSelectedTypes(selectedTypes.filter(t => t !== typeName));
      setShowLimitWarning(false);
    } else if (selectedTypes.length < 2) {
      setSelectedTypes([...selectedTypes, typeName]);
    } else {
      setShowLimitWarning(true);
    }
  };

  if (isLoading) return <div className={styles.loading}>Loading types...</div>;
  if (error) return <div className={styles.error}>Error loading types</div>;

  return (
    <section className={styles.selector}>
      <div className={styles.headerRow}>
        <h2>Select Pokémon Types {selectedTypes.length > 0 && `(${selectedTypes.length}/2)`}</h2>
        {selectedTypes.length > 0 && (
          <button 
            className={styles.clearButton}
            onClick={() => setSelectedTypes([])}
          >
            Clear selection
          </button>
        )}
      </div>

      {showLimitWarning && (
        <div className={styles.warning}>
          Maximum 2 types can be selected
        </div>
      )}

      <div className={styles.grid}>
        {types?.map(type => {
          const isSelected = selectedTypes.includes(type.name);
          return (
            <button
              key={type.name}
              className={`${styles.typeButton} ${styles[type.name]} ${isSelected ? styles.selected : ''}`}
              onClick={() => handleTypeClick(type.name)}
            >
              {type.name}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TypeSelector;
