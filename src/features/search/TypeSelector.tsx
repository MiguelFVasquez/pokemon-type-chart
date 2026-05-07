import React from 'react';
import { useTypes } from '../../hooks/usePokemonData';
import styles from './TypeSelector.module.css';

const TypeSelector: React.FC = () => {
  const { data: types, isLoading, error } = useTypes();

  if (isLoading) return <div>Loading types...</div>;
  if (error) return <div>Error loading types</div>;

  return (
    <section className={styles.selector}>
      <h2>Select Pokémon Types</h2>
      <div className={styles.grid}>
        {types?.map(type => (
          <button key={type.name} className={`${styles.typeButton} ${styles[type.name]}`}>
            {type.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TypeSelector;
