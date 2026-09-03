import React from 'react';
import { cn } from '../../lib/utils';

export interface SimpleTableColumn<T = any> {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface SimpleTableProps<T = any> {
  columns: SimpleTableColumn<T>[];
  data: T[];
  striped?: boolean;
  emptyText?: string;
  className?: string;
}

export function SimpleTable<T extends Record<string, any>>({
  columns,
  data,
  striped = false,
  emptyText = 'No data available',
  className,
}: SimpleTableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs select-none", className)}>
      <table className="w-full text-xs text-left border-collapse">
        <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3",
                  col.align === 'center' && "text-center",
                  col.align === 'right' && "text-right"
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-400 text-xs">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40",
                  striped && rowIndex % 2 === 1 && "bg-slate-50/50 dark:bg-slate-800/20"
                )}
              >
                {columns.map((col) => {
                  const val = row[col.key];
                  return (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-3 font-semibold",
                        col.align === 'center' && "text-center",
                        col.align === 'right' && "text-right"
                      )}
                    >
                      {col.render ? col.render(val, row, rowIndex) : val}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
