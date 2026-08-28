import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface MessageVersionSwitcherProps {
  currentVersion: number;
  totalVersions: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const MessageVersionSwitcher: React.FC<MessageVersionSwitcherProps> = ({
  currentVersion,
  totalVersions,
  onPrevious,
  onNext,
}) => {
  if (totalVersions <= 1) return null;

  return (
    <div className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 select-none">
      <button
        onClick={onPrevious}
        disabled={currentVersion <= 1}
        className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        title="Previous Version"
      >
        <ChevronLeft size={14} />
      </button>
      <span className="font-mono text-[11px] px-1">
        {currentVersion}/{totalVersions}
      </span>
      <button
        onClick={onNext}
        disabled={currentVersion >= totalVersions}
        className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        title="Next Version"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
};
