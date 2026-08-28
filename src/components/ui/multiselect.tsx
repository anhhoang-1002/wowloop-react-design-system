import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  label?: string;
  placeholder?: string;
  options: MultiSelectOption[];
  values: string[];
  onChange: (values: string[]) => void;
  requiredStar?: boolean;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  placeholder = 'Select options...',
  options,
  values,
  onChange,
  requiredStar = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOptions = options.filter((opt) => values.includes(opt.value));
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (val: string) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
  };

  const removeOption = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(values.filter((v) => v !== val));
  };

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

      {/* Trigger Container */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between min-h-[48px] w-full p-2.5 rounded-xl border border-secondary/30 dark:border-slate-700 bg-surface dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 shadow-none cursor-pointer transition-all hover:border-secondary/60",
          isOpen && "border-secondary dark:border-blue-400 ring-2 ring-secondary/20 shadow-input-shadow"
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5 flex-1 pr-2">
          {selectedOptions.length === 0 ? (
            <span className="text-slate-400 font-normal pl-1">{placeholder}</span>
          ) : (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-lg bg-secondary-bg dark:bg-blue-950/80 text-secondary dark:text-blue-300 font-extrabold text-[11px] border border-secondary/20 dark:border-blue-800/40"
              >
                <span>{opt.label}</span>
                <button
                  onClick={(e) => removeOption(opt.value, e)}
                  className="p-0.5 rounded hover:bg-secondary/20 text-secondary dark:text-blue-400"
                >
                  <X size={12} />
                </button>
              </span>
            ))
          )}
        </div>

        <ChevronDown
          size={16}
          className={cn("text-slate-400 transition-transform duration-200 shrink-0", isOpen && "rotate-180 text-secondary")}
        />
      </div>

      {/* Popover */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in-0 zoom-in-95">
          <div className="relative mb-2 px-1">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search options..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-xs text-slate-400">No options found</div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = values.includes(opt.value);
                return (
                  <div
                    key={opt.value}
                    onClick={() => toggleOption(opt.value)}
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
