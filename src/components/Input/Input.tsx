import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  floatingLabel?: string;
  requiredStar?: boolean;
  error?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  floatingLabel,
  requiredStar = false,
  error,
  className = '',
  placeholder = ' ',
  ...props
}) => {
  const isFloating = Boolean(floatingLabel);

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {requiredStar && <span className={styles.requiredStar}>*</span>}
        </label>
      )}
      <div className={styles.wrapper}>
        <input
          className={`
            ${styles.input}
            ${isFloating ? styles.inputFloating : ''}
            ${error ? styles.errorInput : ''}
          `}
          placeholder={isFloating ? ' ' : placeholder}
          {...props}
        />
        {isFloating && (
          <label className={styles.floatingLabel}>
            {floatingLabel}
            {requiredStar && <span className={styles.requiredStar}> *</span>}
          </label>
        )}
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};
