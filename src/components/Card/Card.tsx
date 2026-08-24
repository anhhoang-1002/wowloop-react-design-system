import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'blue-shadow' | 'light' | 'input-shadow' | 'pill' | 'none';
  hoverable?: boolean;
  borderedBlue?: boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'blue-shadow',
  hoverable = false,
  borderedBlue = false,
  title,
  subtitle,
  footer,
  children,
  className = '',
  ...props
}) => {
  const getShadowClass = () => {
    switch (variant) {
      case 'blue-shadow': return styles.blueShadow;
      case 'light': return styles.lightShadow;
      case 'input-shadow': return styles.inputShadow;
      case 'pill': return styles.pillShadow;
      case 'none': return styles.noShadow;
      default: return styles.blueShadow;
    }
  };

  const classNames = [
    styles.card,
    getShadowClass(),
    hoverable ? styles.hoverable : '',
    borderedBlue ? styles.borderedBlue : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && (typeof title === 'string' ? <h3 className={styles.title}>{title}</h3> : title)}
          {subtitle && (typeof subtitle === 'string' ? <p className={styles.subtitle}>{subtitle}</p> : subtitle)}
        </div>
      )}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};
