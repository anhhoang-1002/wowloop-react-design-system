import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface CodeBlockProps {
  language?: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language = 'typescript', code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-[#0F172A] text-slate-100 my-3 font-mono text-xs shadow-md">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1E293B] border-b border-slate-700/80 text-slate-400 select-none">
        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-slate-700/60 transition-colors"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>

      {/* Code Body Container */}
      <div className="p-4 overflow-x-auto leading-relaxed">
        <pre className="m-0 font-mono text-slate-200">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
