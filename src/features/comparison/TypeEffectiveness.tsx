import React from 'react';
import { usePokemonContext } from '../../context/PokemonContext';
import { useCombinedEffectiveness, useTypes } from '../../hooks/usePokemonData';
import styles from './TypeEffectiveness.module.css';
import typeStyles from '../search/TypeSelector.module.css';

const TypeEffectiveness: React.FC = () => {
  const { selectedTypes } = usePokemonContext();
  const { effectiveness, isLoading, isError } = useCombinedEffectiveness(selectedTypes);
  const { data: allTypes } = useTypes();

  if (selectedTypes.length === 0) {
    return (
      <div className={styles.placeholder}>
        <p>Select one or two types above to see their combined defensive effectiveness.</p>
      </div>
    );
  }
  if (isLoading) return <div className={styles.loading}>Analyzing type effectiveness...</div>;
  if (isError) return <div className={styles.error}>Error calculating effectiveness</div>;
  if (!effectiveness) return null;

  const grouped = {
    superWeak: [] as string[],
    weak: [] as string[],
    normal: [] as string[],
    resistant: [] as string[],
    superResistant: [] as string[],
    immune: [] as string[],
  };

  // Ensure we cover all types
  allTypes?.forEach(type => {
    const multiplier = effectiveness[type.name] ?? 1;
    if (multiplier === 4) grouped.superWeak.push(type.name);
    else if (multiplier === 2) grouped.weak.push(type.name);
    else if (multiplier === 1) grouped.normal.push(type.name);
    else if (multiplier === 0.5) grouped.resistant.push(type.name);
    else if (multiplier === 0.25) grouped.superResistant.push(type.name);
    else if (multiplier === 0) grouped.immune.push(type.name);
  });

  const renderGroup = (title: string, types: string[], multiplier: string, className: string) => {
    if (types.length === 0) return null;
    return (
      <div className={`${styles.group} ${className}`}>
        <h3 className={styles.groupTitle}>
          {title} <span className={styles.multiplier}>({multiplier})</span>
        </h3>
        <div className={styles.typeGrid}>
          {types.map(type => (
            <div key={type} className={`${typeStyles.typeButton} ${typeStyles[type]}`}>
              {type}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        Effectiveness against: {selectedTypes.join(' / ')}
      </h2>
      
      <div className={styles.results}>
        {renderGroup('Super Weak', grouped.superWeak, '4x', styles.superWeak)}
        {renderGroup('Weak', grouped.weak, '2x', styles.weak)}
        {renderGroup('Resistant', grouped.resistant, '0.5x', styles.resistant)}
        {renderGroup('Super Resistant', grouped.superResistant, '0.25x', styles.superResistant)}
        {renderGroup('Immune', grouped.immune, '0x', styles.immune)}
      </div>
    </section>
  );
};

export default TypeEffectiveness;
