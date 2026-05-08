import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePokemonContext } from '../../context/PokemonContext';
import { useCombinedEffectiveness, useTypes } from '../../hooks/usePokemonData';
import styles from './TypeEffectiveness.module.css';
import typeStyles from '../search/TypeSelector.module.css';

const TypeEffectiveness: React.FC = () => {
  const { t } = useTranslation();
  const { selectedTypes } = usePokemonContext();
  const { effectiveness, isLoading, isError } = useCombinedEffectiveness(selectedTypes);
  const { data: allTypes } = useTypes();

  if (selectedTypes.length === 0) {
    return (
      <div className={styles.placeholder}>
        <p>{t('effectiveness.placeholder')}</p>
      </div>
    );
  }
  if (isLoading) return <div className={styles.loading}>{t('effectiveness.analyzing')}</div>;
  if (isError) return <div className={styles.error}>{t('common.error')}</div>;
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
            <div key={type} className={`${typeStyles.typeButton} ${typeStyles[type.toLowerCase()]}`}>
              {t(`types.${type.toLowerCase()}`)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        {t('effectiveness.title')}: {selectedTypes.map(type => t(`types.${type.toLowerCase()}`)).join(' / ')}
      </h2>
      
      <div className={styles.results}>
        {renderGroup(t('effectiveness.super_weak'), grouped.superWeak, '4x', styles.superWeak)}
        {renderGroup(t('effectiveness.weak'), grouped.weak, '2x', styles.weak)}
        {renderGroup(t('effectiveness.resistant'), grouped.resistant, '0.5x', styles.resistant)}
        {renderGroup(t('effectiveness.super_resistant'), grouped.superResistant, '0.25x', styles.superResistant)}
        {renderGroup(t('effectiveness.immune'), grouped.immune, '0x', styles.immune)}
      </div>
    </section>
  );
};

export default TypeEffectiveness;
