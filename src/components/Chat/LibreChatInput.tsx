import React, { useState } from 'react';
import { Paperclip, ArrowUp, Sparkles, Mic } from 'lucide-react';

export interface LibreChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const LibreChatInput: React.FC<LibreChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 pt-2">
      {/* Floating Input Box (Lighter Elevated Surface in Dark Mode) */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-xl p-3 transition-all focus-within:border-secondary dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-secondary/20">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Wowloop AI or enter a subscription command..."
          rows={2}
          disabled={disabled}
          className="w-full resize-none border-none outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 bg-transparent px-1"
        />

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 mt-1">
          {/* Tool Buttons */}
          <div className="flex items-center gap-1">
            <button
              className="p-1.5 rounded-lg text-slate-400 dark:text-slate-300 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Attach File"
            >
              <Paperclip size={18} />
            </button>
            <button
              className="p-1.5 rounded-lg text-slate-400 dark:text-slate-300 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-semibold"
              title="MCP Tools & Prompts"
            >
              <Sparkles size={16} className="text-secondary dark:text-blue-400" />
              <span className="text-slate-600 dark:text-slate-200 hidden sm:inline">MCP Prompts</span>
            </button>
            <button
              className="p-1.5 rounded-lg text-slate-400 dark:text-slate-300 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Voice Input"
            >
              <Mic size={18} />
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              input.trim()
                ? 'bg-gradient-to-r from-[#009959] to-[#52CC85] text-white shadow-btn-green scale-100 hover:opacity-90'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed scale-95'
            }`}
          >
            <ArrowUp size={18} className="stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <p className="text-[11px] text-center text-slate-400 dark:text-slate-400 mt-2">
        Wowloop AI may produce inaccurate information about subscriptions or analytics. Verify important metrics.
      </p>
    </div>
  );
};
