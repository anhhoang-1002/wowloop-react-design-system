import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary-gradient' | 'secondary-gradient' | 'deep-blue' | 'solid-green' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary-gradient',
  size = 'md',
  pill = false,
  fullWidth = false,
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary-gradient': return styles.primaryGradient;
      case 'secondary-gradient': return styles.secondaryGradient;
      case 'deep-blue': return styles.deepBlue;
      case 'solid-green': return styles.solidGreen;
      case 'outline': return styles.outline;
      case 'ghost': return styles.ghost;
      default: return styles.primaryGradient;
    }
  };

  const classNames = [
    styles.btn,
    getVariantClass(),
    styles[size],
    pill ? styles.pill : '',
    fullWidth ? styles.fullWidth : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} disabled={disabled || loading} {...props}>
      {loading ? <span className={styles.spinner} /> : icon ? icon : null}
      <span>{children}</span>
    </button>
  );
};
