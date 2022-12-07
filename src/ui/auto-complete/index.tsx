import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
export { useAutoComplete } from './useAutoComplete';

export type OptionType = {
  label: string;
  value: string;
};

type AutoCompleteProps = {
  options: OptionType[];
  onChange: (value: string) => void;
  onOptionClick?: (option: OptionType) => void;
  value: string;
  helperText?: string;
  placeholder?: string;
  className?: string;
};

const AutoComplete = ({
  value,
  options,
  onChange,
  placeholder,
  className,
  helperText,
  onOptionClick,
}: AutoCompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleBlur = () => {
    setIsOpen(false);
  };
  const handleFocus = () => {
    setIsOpen(true);
  };
  const handleMouseDownPreventBlur = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleOptionClick = (option: OptionType) => {
    setIsOpen(false);
    onOptionClick?.(option);
  };

  const [activeOption, setActiveOption] = useState(0);
  const handleMouseEnter = (index: number) => {
    setActiveOption(index);
  };
  const handleKeyDOwn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (options.length === 0) {
      return;
    }
    if (e.key === 'Enter') {
      if (isOpen) {
        handleOptionClick(options[activeOption]);
        setActiveOption(0);
      } else {
        setIsOpen(true);
      }
    } else if (e.key === 'Escape') {
      setActiveOption(0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeOption === 0) {
        setActiveOption(0);
      } else {
        setActiveOption(activeOption - 1);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (activeOption === options.length - 1) {
        setActiveOption(options.length - 1);
      } else {
        setActiveOption(activeOption + 1);
      }
    }
  };
  useEffect(() => {
    const el = document.getElementById(`option-${activeOption}`);
    el?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
  }, [activeOption]);
  useEffect(() => {
    setActiveOption(0);
  }, [options]);

  return (
    <div>
      <input
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        value={value}
        onKeyDown={handleKeyDOwn}
        onChange={(e) => onChange(e.target.value)}
        className={`${styles.input} ${className}`}
      />
      {isOpen && (helperText || options.length > 0) && (
        <div className={styles.modal} onMouseDown={handleMouseDownPreventBlur}>
          {helperText ? (
            <div className={styles.helperText}>{helperText}</div>
          ) : (
            <>
              {options.map((option, index) => (
                <div
                  id={`option-${index}`}
                  key={option.value}
                  className={`${styles.option} ${activeOption === index ? styles.active : ''}`}
                  onClick={() => handleOptionClick(option)}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  {option.label}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export { AutoComplete };
