import React from 'react';
import styles from './StatCard.module.css';

export interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
}) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.topRow}>
        <span className={styles.title}>{title}</span>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
      </div>
      <div className={styles.value}>{value}</div>
      {change && (
        <div className={styles.changeRow}>
          <span className={isPositive ? styles.positive : styles.negative}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
          <span style={{ color: '#9B9B9B' }}>vs last month</span>
        </div>
      )}
    </div>
  );
};
