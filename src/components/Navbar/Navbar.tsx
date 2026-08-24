import React from 'react';
import { Button } from '../Button';
import styles from './Navbar.module.css';

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavbarProps {
  logoUrl?: string;
  navItems?: NavItem[];
  onBookCall?: () => void;
  onLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  logoUrl = '/logo-wowsuite.svg',
  navItems = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Case Studies', href: '#case-studies' },
  ],
  onBookCall,
  onLogin,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <img src={logoUrl} alt="WOWsuite AI Logo" width="148" height="36" style={{ height: '36px', width: 'auto' }} />
          <div className={styles.logoTag}>Recurring Revenue Operating System</div>
        </div>

        <nav>
          <ul className={styles.navLinks}>
            {navItems.map((item, idx) => (
              <li
                key={idx}
                className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}
              >
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button variant="ghost" size="sm" onClick={onLogin}>
            Login
          </Button>
          <Button variant="primary-gradient" size="sm" pill onClick={onBookCall}>
            Book A Strategy Call
          </Button>
        </div>
      </div>
    </header>
  );
};
