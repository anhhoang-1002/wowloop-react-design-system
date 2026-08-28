import React, { useState } from 'react';
import { Copy, Check, Code, Eye } from 'lucide-react';

export interface ComponentDocSectionProps {
  id: string;
  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
  codeSnippet: string;
}

export const ComponentDocSection: React.FC<ComponentDocSectionProps> = ({
  id,
  title,
  description,
  category,
  children,
  codeSnippet,
}) => {
  const [activeView, setActiveView] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id={id} className="scroll-mt-24 space-y-4 pb-10 border-b border-slate-200 dark:border-slate-800">
      {/* Component Header Info */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold bg-secondary-bg dark:bg-blue-950/80 text-secondary dark:text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-wider border border-secondary/20 dark:border-blue-800/40">
              {category}
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{description}</p>
        </div>

        {/* Preview / Code Toggle Tabs */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-bold select-none shrink-0">
          <button
            onClick={() => setActiveView('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              activeView === 'preview'
                ? 'bg-white dark:bg-slate-700 text-secondary dark:text-blue-400 shadow-xs font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye size={14} /> Preview
          </button>
          <button
            onClick={() => setActiveView('code')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              activeView === 'code'
                ? 'bg-white dark:bg-slate-700 text-secondary dark:text-blue-400 shadow-xs font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code size={14} /> Code
          </button>
        </div>
      </div>

      {/* Main View Container */}
      {activeView === 'preview' ? (
        <div className="p-6 rounded-2xl bg-canvas dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 min-h-[140px] flex items-center justify-center transition-colors">
          <div className="w-full">{children}</div>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden border border-slate-700/80 bg-[#0F172A] text-slate-100 font-mono text-xs shadow-md">
          <div className="flex items-center justify-between px-4 py-2 bg-[#1E293B] border-b border-slate-700/80 text-slate-400 select-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">JSX / TSX</span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-slate-700/60 transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <div className="p-4 overflow-x-auto leading-relaxed">
            <pre className="m-0 font-mono text-slate-200">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
};
