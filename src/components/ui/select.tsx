import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  label: string;
  value: string;
  badge?: string;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  searchable?: boolean;
  clearable?: boolean;
  requiredStar?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Select an option...',
  options,
  value,
  onChange,
  searchable = true,
  clearable = true,
  requiredStar = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full text-left select-none">
      {label && (
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
          {label}
          {requiredStar && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between h-12 w-full px-4 rounded-xl border border-secondary/30 dark:border-slate-700 bg-surface dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 shadow-none cursor-pointer transition-all hover:border-secondary/60",
          isOpen && "border-secondary dark:border-blue-400 ring-2 ring-secondary/20 shadow-input-shadow"
        )}
      >
        <span className={selectedOption ? 'text-slate-900 dark:text-slate-100 font-bold' : 'text-slate-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <div className="flex items-center gap-1.5">
          {clearable && selectedOption && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown
            size={16}
            className={cn("text-slate-400 transition-transform duration-200", isOpen && "rotate-180 text-secondary")}
          />
        </div>
      </div>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in-0 zoom-in-95">
          {searchable && (
            <div className="relative mb-2 px-1">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 outline-none focus:ring-1 focus:ring-secondary"
              />
            </div>
          )}

          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-xs text-slate-400">No options found</div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors",
                      isSelected
                        ? "bg-secondary-bg dark:bg-blue-950/80 text-secondary dark:text-blue-300 font-extrabold"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                    )}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check size={14} className="text-secondary dark:text-blue-400" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
