import React from 'react';
import styles from './Typography.module.css';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const H1: React.FC<HeadingProps> = ({ children, className = '', ...props }) => (
  <h1 className={`${styles.h1} ${className}`} {...props}>{children}</h1>
);

export const H2: React.FC<HeadingProps> = ({ children, className = '', ...props }) => (
  <h2 className={`${styles.h2} ${className}`} {...props}>{children}</h2>
);

export const H3: React.FC<HeadingProps> = ({ children, className = '', ...props }) => (
  <h3 className={`${styles.h3} ${className}`} {...props}>{children}</h3>
);

export const H4: React.FC<HeadingProps> = ({ children, className = '', ...props }) => (
  <h4 className={`${styles.h4} ${className}`} {...props}>{children}</h4>
);

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'regular' | 'muted' | 'blue' | 'green';
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ variant = 'regular', children, className = '', ...props }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'muted': return styles.textMuted;
      case 'blue': return styles.textBlue;
      case 'green': return styles.textGreen;
      default: return '';
    }
  };

  return (
    <p className={`${styles.text} ${getVariantClass()} ${className}`} {...props}>
      {children}
    </p>
  );
};

export const HighlightText: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, className = '', ...props }) => (
  <span className={`${styles.highlight} ${className}`} {...props}>{children}</span>
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'green' | 'orange';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'blue', children, className = '', ...props }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'green': return styles.badgeGreen;
      case 'orange': return styles.badgeOrange;
      default: return styles.badgeBlue;
    }
  };

  return (
    <span className={`${styles.badge} ${getVariantClass()} ${className}`} {...props}>
      {children}
    </span>
  );
};
