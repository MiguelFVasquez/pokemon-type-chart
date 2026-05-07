import React from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Pokémon Type Chart</h1>
      </header>
      <main className={styles.content}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>Data sourced from <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a></p>
          <p className={styles.disclaimer}>
            Pokémon and Pokémon character names are trademarks of Nintendo. 
            Built for educational purposes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
