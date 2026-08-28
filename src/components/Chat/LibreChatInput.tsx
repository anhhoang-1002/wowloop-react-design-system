import React, { useState } from 'react';
import { Paperclip, ArrowUp, Mic, Terminal } from 'lucide-react';
import { AttachmentList, FileAttachment } from './AttachmentList';
import { CommandPopover, CommandItem } from './CommandPopover';

export interface LibreChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const LibreChatInput: React.FC<LibreChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isCommandPopoverOpen, setIsCommandPopoverOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim() && attachments.length === 0) return;
    onSendMessage(input);
    setInput('');
    setAttachments([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachMockFile = () => {
    const newFile: FileAttachment = {
      id: Date.now().toString(),
      name: 'MRR_Report_Q3.pdf',
      size: '240 KB',
      type: 'file',
    };
    setAttachments((prev) => [...prev, newFile]);
  };

  const handleSelectCommand = (item: CommandItem) => {
    setInput((prev) => (prev ? `${prev} ${item.name} ` : `${item.name} `));
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 pt-2 relative">
      {/* Popover for Commands & Agents */}
      <CommandPopover
        isOpen={isCommandPopoverOpen}
        onSelect={handleSelectCommand}
        onClose={() => setIsCommandPopoverOpen(false)}
      />

      {/* Floating Input Box (Normal state: shadow-none, Focus state: shadow-input-shadow) */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-secondary/30 dark:border-slate-700/80 shadow-none transition-all focus-within:shadow-input-shadow focus-within:border-secondary dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-secondary/20 overflow-hidden">
        {/* Attachment Bar */}
        <AttachmentList
          files={attachments}
          onRemoveFile={(id) => setAttachments((prev) => prev.filter((f) => f.id !== id))}
        />

        <div className="p-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Wowloop AI, type @ for agents or / for commands..."
            rows={2}
            disabled={disabled}
            className="w-full resize-none border-none outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 bg-transparent px-1"
          />

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 mt-1">
            {/* Tool Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleAttachMockFile}
                className="p-1.5 rounded-lg text-slate-400 dark:text-slate-300 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Attach File"
              >
                <Paperclip size={18} />
              </button>

              <button
                onClick={() => setIsCommandPopoverOpen(!isCommandPopoverOpen)}
                className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold ${
                  isCommandPopoverOpen
                    ? 'bg-secondary/10 text-secondary dark:text-blue-400 font-bold'
                    : 'text-slate-400 dark:text-slate-300 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Agents & Commands"
              >
                <Terminal size={16} />
                <span className="hidden sm:inline">Commands</span>
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
              disabled={(!input.trim() && attachments.length === 0) || disabled}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                input.trim() || attachments.length > 0
                  ? 'bg-gradient-to-r from-[#009959] to-[#52CC85] text-white shadow-btn-green scale-100 hover:opacity-90'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed scale-95'
              }`}
            >
              <ArrowUp size={18} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <p className="text-[11px] text-center text-slate-400 dark:text-slate-400 mt-2">
        Wowloop AI may produce inaccurate information about subscriptions or analytics. Verify important metrics.
      </p>
    </div>
  );
};
