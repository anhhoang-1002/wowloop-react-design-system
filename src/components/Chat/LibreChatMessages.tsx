import React from 'react';
import { Sparkles, Copy, ThumbsUp, ThumbsDown, RotateCw, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { MessageVersionSwitcher } from './MessageVersionSwitcher';
import { CodeBlock } from './CodeBlock';
import { ThinkingProcessAccordion } from './ThinkingProcessAccordion';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  widget?: 'metrics' | 'program';
  thinkingText?: string;
  codeSnippet?: { language: string; code: string };
  versionInfo?: { current: number; total: number };
}

export interface LibreChatMessagesProps {
  messages: ChatMessage[];
}

export const LibreChatMessages: React.FC<LibreChatMessagesProps> = ({ messages }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-4xl mx-auto w-full">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {/* Assistant Avatar */}
          {msg.sender === 'assistant' && (
            <div className="w-8 h-8 rounded-xl bg-secondary-bg dark:bg-blue-950/80 text-secondary dark:text-blue-400 flex items-center justify-center shrink-0 border border-secondary/20 dark:border-blue-800/40 shadow-xs">
              <Sparkles size={16} />
            </div>
          )}

          {/* Message Content Container */}
          <div className={`max-w-2xl space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            {/* Thinking Accordion */}
            {msg.sender === 'assistant' && msg.thinkingText && (
              <ThinkingProcessAccordion thinkingText={msg.thinkingText} />
            )}

            {/* Message Bubble */}
            <div
              className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#009959] to-[#52CC85] text-white font-medium rounded-tr-none shadow-md'
                  : 'bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 text-foreground dark:text-slate-100 rounded-tl-none shadow-xs'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>

            {/* Embedded Code Block */}
            {msg.codeSnippet && (
              <CodeBlock language={msg.codeSnippet.language} code={msg.codeSnippet.code} />
            )}

            {/* Embedded Interactive Widget */}
            {msg.sender === 'assistant' && msg.widget === 'metrics' && (
              <Card variant="input-shadow" className="mt-3">
                <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-700">
                  <CardTitle className="text-xs font-bold text-secondary dark:text-blue-400 uppercase tracking-wider">
                    Live MRR & Retention Summary
                  </CardTitle>
                  <span className="text-[10px] bg-primary-vibrant/10 text-primary-vibrant font-extrabold px-2 py-0.5 rounded-full">
                    VERIFIED
                  </span>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-2 gap-4 items-start space-y-0">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1 leading-snug">
                      Monthly Recurring Revenue
                    </div>
                    <div className="text-xl font-black text-secondary dark:text-blue-400 leading-none mb-1">
                      $128,450
                    </div>
                    <div className="text-[11px] text-primary-vibrant font-bold leading-none">
                      ↑ 14.2% vs last month
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1 leading-snug">
                      Active Retention Rate
                    </div>
                    <div className="text-xl font-black text-secondary dark:text-blue-400 leading-none mb-1">
                      94.6%
                    </div>
                    <div className="text-[11px] text-primary-vibrant font-bold leading-none">
                      ↑ 2.1% vs last month
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Assistant Action Bar & Version Switcher */}
            {msg.sender === 'assistant' && (
              <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 text-xs pt-1 w-full">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                  >
                    {copiedId === msg.id ? <Check size={14} className="text-primary-vibrant" /> : <Copy size={14} />}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button className="hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <ThumbsUp size={14} />
                  </button>
                  <button className="hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <ThumbsDown size={14} />
                  </button>
                  <button className="hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 ml-2">
                    <RotateCw size={14} />
                    <span>Regenerate</span>
                  </button>
                </div>

                {/* Version Switcher */}
                {msg.versionInfo && (
                  <MessageVersionSwitcher
                    currentVersion={msg.versionInfo.current}
                    totalVersions={msg.versionInfo.total}
                    onPrevious={() => {}}
                    onNext={() => {}}
                  />
                )}
              </div>
            )}
          </div>

          {/* User Avatar */}
          {msg.sender === 'user' && (
            <div className="w-8 h-8 rounded-full bg-secondary dark:bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
              WA
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
