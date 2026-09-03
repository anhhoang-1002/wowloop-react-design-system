import React, { useState } from 'react';
import { Plus, MoreHorizontal, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from './badge';

export interface KanbanItem {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  tag?: string;
  priority?: 'Low' | 'Medium' | 'High';
  assignee?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
}

export interface KanbanBoardProps {
  columns?: KanbanColumn[];
  initialItems?: KanbanItem[];
  onItemMove?: (itemId: string, newColumnId: string) => void;
  className?: string;
}

const defaultColumns: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-400' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-blue-500' },
  { id: 'review', title: 'Under Review', color: 'bg-amber-500' },
  { id: 'done', title: 'Completed', color: 'bg-emerald-500' },
];

const defaultInitialItems: KanbanItem[] = [
  {
    id: 'task-1',
    columnId: 'todo',
    title: 'Setup Retention Webhook API',
    description: 'Integrate automated win-back triggers for Shopify store.',
    tag: 'Backend',
    priority: 'High',
    assignee: 'WA',
  },
  {
    id: 'task-2',
    columnId: 'in_progress',
    title: 'Design Library NPM Packaging',
    description: 'Bundle ESM, CJS, and CSS outputs for company projects.',
    tag: 'Design System',
    priority: 'High',
    assignee: 'AH',
  },
  {
    id: 'task-3',
    columnId: 'review',
    title: 'LibreChat v0.7.5 Stream Testing',
    description: 'Verify token streaming and auto-scroll behavior.',
    tag: 'AI Engine',
    priority: 'Medium',
    assignee: 'WA',
  },
  {
    id: 'task-4',
    columnId: 'done',
    title: 'Antigravity Settings Modal',
    description: 'Full-height left sidebar layout with auto-saved controls.',
    tag: 'UI Primitive',
    priority: 'Low',
    assignee: 'AH',
  },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns = defaultColumns,
  initialItems = defaultInitialItems,
  onItemMove,
  className,
}) => {
  const [items, setItems] = useState<KanbanItem[]>(initialItems);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItemId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain') || draggedItemId;
    if (!itemId) return;

    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, columnId: targetColumnId } : item))
    );

    if (onItemMove) {
      onItemMove(itemId, targetColumnId);
    }
    setDraggedItemId(null);
  };

  return (
    <div className={cn("w-full overflow-x-auto pb-2 select-none", className)}>
      <div className="flex gap-4 min-w-[800px]">
        {columns.map((col) => {
          const colItems = items.filter((item) => item.columnId === col.id);
          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              className="flex-1 bg-slate-100/70 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col min-h-[360px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={cn("w-2.5 h-2.5 rounded-full", col.color || 'bg-secondary')} />
                  <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                    {col.title}
                  </h4>
                  <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
                    {colItems.length}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-slate-400 hover:text-slate-600">
                  <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700">
                    <Plus size={14} />
                  </button>
                  <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>

              {/* Column Cards Container */}
              <div className="flex-1 space-y-2.5">
                {colItems.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md cursor-grab active:cursor-grabbing transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {item.title}
                      </span>
                      {item.priority && (
                        <span
                          className={cn(
                            "text-[9px] font-extrabold px-1.5 py-0.3 rounded uppercase tracking-wider shrink-0",
                            item.priority === 'High' && "bg-rose-500/10 text-rose-600 border border-rose-500/20",
                            item.priority === 'Medium' && "bg-amber-500/10 text-amber-600 border border-amber-500/20",
                            item.priority === 'Low' && "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                          )}
                        >
                          {item.priority}
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="pt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-[10px]">
                      {item.tag ? (
                        <Badge variant="blue" className="text-[9px] px-2 py-0.2">
                          {item.tag}
                        </Badge>
                      ) : (
                        <span />
                      )}

                      {item.assignee && (
                        <div className="w-5 h-5 rounded-full bg-secondary dark:bg-blue-600 text-white font-extrabold text-[9px] flex items-center justify-center">
                          {item.assignee}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
