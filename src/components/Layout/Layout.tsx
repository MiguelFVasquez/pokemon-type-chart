import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{t('layout.title')}</h1>
          <LanguageSelector />
        </div>
      </header>
      <main className={styles.content}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>
            {t('layout.footer')}{' '}
            <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a>
          </p>
          <p>
            <a 
              href="https://github.com/MiguelFVasquez/pokemon-type-chart" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              <svg className={styles.icon} width="20" height="20">
                <use href="/icons.svg#github-icon" />
              </svg>
              GitHub Repository
            </a>
          </p>
          <p className={styles.disclaimer}>
            {t('layout.disclaimer')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
