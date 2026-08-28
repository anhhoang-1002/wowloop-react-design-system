import React, { useState } from 'react';
import { Brain, ChevronDown } from 'lucide-react';

export interface ThinkingProcessAccordionProps {
  thinkingText: string;
  durationSeconds?: number;
  defaultExpanded?: boolean;
}

export const ThinkingProcessAccordion: React.FC<ThinkingProcessAccordionProps> = ({
  thinkingText,
  durationSeconds = 2.4,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-slate-200 dark:border-slate-700/80 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 overflow-hidden my-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3.5 py-2 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors select-none"
      >
        <div className="flex items-center gap-2">
          <Brain size={15} className="text-secondary dark:text-blue-400 animate-pulse" />
          <span>Thought for {durationSeconds}s</span>
        </div>
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 text-slate-400 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="px-4 py-3 border-t border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono whitespace-pre-wrap bg-white/50 dark:bg-slate-900/40">
          {thinkingText}
        </div>
      )}
    </div>
  );
};
