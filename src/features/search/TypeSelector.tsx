import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypes } from '../../hooks/usePokemonData';
import { usePokemonContext } from '../../context/PokemonContext';
import styles from './TypeSelector.module.css';

const TypeSelector: React.FC = () => {
  const { t } = useTranslation();
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

  if (isLoading) return <div className={styles.loading}>{t('selector.loading')}</div>;
  if (error) return <div className={styles.error}>{t('common.error')}</div>;

  return (
    <section className={styles.selector}>
      <div className={styles.headerRow}>
        <h2>{t('selector.title')} {selectedTypes.length > 0 && `(${selectedTypes.length}/2)`}</h2>
        {selectedTypes.length > 0 && (
          <button 
            className={styles.clearButton}
            onClick={() => setSelectedTypes([])}
          >
            {t('common.clear')}
          </button>
        )}
      </div>

      {showLimitWarning && (
        <div className={styles.warning}>
          {t('selector.limit_warning')}
        </div>
      )}

      <div className={styles.grid}>
        {types?.map(type => {
          const isSelected = selectedTypes.includes(type.name);
          const typeNameLower = type.name.toLowerCase();
          return (
            <button
              key={type.name}
              className={`${styles.typeButton} ${styles[typeNameLower]} ${isSelected ? styles.selected : ''}`}
              onClick={() => handleTypeClick(type.name)}
            >
              {t(`types.${typeNameLower}`)}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TypeSelector;
