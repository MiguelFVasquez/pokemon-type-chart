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
        <p>Powered by PokeAPI</p>
      </footer>
    </div>
  );
};

export default Layout;
