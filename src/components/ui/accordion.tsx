import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, defaultOpenId }) => {
  const [openId, setOpenId] = useState<string | undefined>(defaultOpenId);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? undefined : id);
  };

  return (
    <div className="w-full border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="transition-colors">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors select-none"
            >
              <span>{item.title}</span>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-secondary dark:text-blue-400' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in-0 duration-150">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
