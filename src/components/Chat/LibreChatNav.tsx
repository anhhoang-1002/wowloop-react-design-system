import React, { useState } from 'react';
import { SquarePen, Search, MessageSquare, MoreHorizontal, Settings } from 'lucide-react';
import { WowloopNavItem } from '../Nav/WowloopNavItem';

export interface LibreChatNavProps {
  isOpen: boolean;
  onNewChat: () => void;
  activeChatId?: string;
  onSelectChat?: (id: string) => void;
  onOpenSettings?: () => void;
}

export const LibreChatNav: React.FC<LibreChatNavProps> = ({
  isOpen,
  onNewChat,
  activeChatId = 'chat-1',
  onSelectChat,
  onOpenSettings,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const chatHistory = [
    { section: 'Today', items: [{ id: 'chat-1', title: 'Recurring Revenue & Win-back Campaign' }, { id: 'chat-2', title: 'MRR Growth Strategy Q3' }] },
    { section: 'Yesterday', items: [{ id: 'chat-3', title: 'Shopify Subscription Funnel Setup' }] },
    { section: 'Previous 7 Days', items: [{ id: 'chat-4', title: 'Customer Lifetime Value Audit' }, { id: 'chat-5', title: 'Affiliate Retention Offer Rules' }] },
  ];

  return (
    <aside className="w-64 border-r border-border dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col justify-between h-[calc(100vh-3.5rem)] sticky top-14 z-20 shrink-0 select-none transition-colors">
      {/* Top Section */}
      <div className="p-3 space-y-3 flex-1 overflow-y-auto">
        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm shadow-xs hover:bg-slate-100 dark:hover:bg-slate-750 transition-all"
        >
          <span className="flex items-center gap-2">
            <SquarePen size={17} className="text-secondary dark:text-blue-400 shrink-0" /> New Chat
          </span>
          <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono">⌘K</span>
        </button>

        {/* Search Bar */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-secondary"
          />
        </div>

        {/* Custom Wowloop SaaS Integration Item */}
        <div className="pt-1">
          <WowloopNavItem isActive={true} />
        </div>

        {/* Chat History List */}
        <div className="pt-2 space-y-3">
          {chatHistory.map((sec, idx) => (
            <div key={idx}>
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-1">
                {sec.section}
              </div>
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const isActive = activeChatId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectChat && onSelectChat(item.id)}
                      className={`group flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-white dark:bg-slate-800 text-secondary dark:text-blue-400 shadow-xs border border-slate-200/60 dark:border-slate-700'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <MessageSquare
                          size={16}
                          className={`shrink-0 ${
                            isActive ? 'text-secondary dark:text-blue-400 stroke-[2]' : 'text-slate-400 dark:text-slate-500 stroke-[2]'
                          }`}
                        />
                        <span className="truncate">{item.title}</span>
                      </div>
                      <MoreHorizontal size={14} className="text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Profile Footer */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/90 flex items-center justify-between">
        <div
          onClick={onOpenSettings}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-secondary dark:bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
            WA
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Wow Admin</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">PRO Plan Active</span>
          </div>
        </div>
        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          title="Settings"
        >
          <Settings size={16} />
        </button>
      </div>
    </aside>
  );
};
