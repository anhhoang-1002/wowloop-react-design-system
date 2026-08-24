import React from 'react';
import styles from './PillBanner.module.css';

export interface PillBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export const PillBanner: React.FC<PillBannerProps> = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`${styles.pillBanner} ${className}`} {...props}>
      <div>
        <h4 className={styles.title}>{title}</h4>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
      <div className={styles.content}>
        {children}
        {action}
      </div>
    </div>
  );
};

export interface StatusChipProps {
  status: 'active' | 'pending' | 'inactive';
  label: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, label }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'active': return styles.statusActive;
      case 'pending': return styles.statusPending;
      case 'inactive': return styles.statusInactive;
    }
  };

  return (
    <span className={`${styles.statusChip} ${getStatusClass()}`}>
      ● {label}
    </span>
  );
};
