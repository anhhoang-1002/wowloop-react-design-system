import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from './badge';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  type?: 'meeting' | 'campaign' | 'release';
}

export interface CalendarViewProps {
  initialEvents?: CalendarEvent[];
  className?: string;
}

const defaultEvents: CalendarEvent[] = [
  { id: '1', title: 'SaaS Win-Back Campaign Launch', date: '2026-09-05', time: '09:00 AM', type: 'campaign' },
  { id: '2', title: 'LibreChat Architecture Review', date: '2026-09-08', time: '02:30 PM', type: 'meeting' },
  { id: '3', title: '@wowsuite/design-system v1.1 Release', date: '2026-09-12', time: '10:00 AM', type: 'release' },
  { id: '4', title: 'Monthly Retention Growth Sync', date: '2026-09-18', time: '04:00 PM', type: 'meeting' },
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarView: React.FC<CalendarViewProps> = ({
  initialEvents = defaultEvents,
  className,
}) => {
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // Sept 2026

  const events = initialEvents;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Month View Days
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrev = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(year, month - 1, 1));
    } else {
      setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
    }
  };

  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(year, month + 1, 1));
    } else {
      setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date(2026, 8, 3));
  };

  return (
    <div className={cn("w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs select-none space-y-4", className)}>
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <CalendarIcon size={18} className="text-secondary dark:text-blue-400" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {monthNames[month]} {year}
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
            <button
              onClick={handlePrev}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleToday}
              className="px-2 py-0.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded"
            >
              Today
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* View Switcher: Month / Week */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => setViewMode('month')}
            className={cn(
              "px-3 py-1 rounded-lg transition-all",
              viewMode === 'month'
                ? "bg-white dark:bg-slate-700 text-secondary dark:text-blue-400 shadow-xs font-extrabold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            Month View
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={cn(
              "px-3 py-1 rounded-lg transition-all",
              viewMode === 'week'
                ? "bg-white dark:bg-slate-700 text-secondary dark:text-blue-400 shadow-xs font-extrabold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            Week View
          </button>
        </div>
      </div>

      {/* Month View Grid */}
      {viewMode === 'month' && (
        <div className="w-full">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 text-center font-extrabold text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-1 bg-slate-100 dark:bg-slate-800/40 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800">
            {/* Blank previous month slots */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`blank-${i}`} className="min-h-[72px] bg-slate-50/50 dark:bg-slate-900/30 rounded-lg p-1.5 opacity-40" />
            ))}

            {/* Current Month Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const dayEvents = events.filter((e) => e.date === dateStr);
              const isToday = dayNum === 3 && month === 8;

              return (
                <div
                  key={dayNum}
                  className={cn(
                    "min-h-[72px] bg-white dark:bg-slate-900 rounded-lg p-1.5 border transition-all flex flex-col justify-between",
                    isToday ? "border-secondary dark:border-blue-400 ring-1 ring-secondary/30" : "border-slate-100 dark:border-slate-800"
                  )}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px]",
                        isToday ? "bg-secondary text-white font-extrabold" : "text-slate-700 dark:text-slate-200"
                      )}
                    >
                      {dayNum}
                    </span>
                  </div>

                  <div className="space-y-1 mt-1">
                    {dayEvents.map((e) => (
                      <div
                        key={e.id}
                        className={cn(
                          "px-1.5 py-0.5 rounded text-[9px] font-extrabold truncate border",
                          e.type === 'campaign' && "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
                          e.type === 'meeting' && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
                          e.type === 'release' && "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800"
                        )}
                      >
                        {e.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View Grid */}
      {viewMode === 'week' && (
        <div className="w-full space-y-2">
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day, idx) => {
              const weekDayNum = 1 + idx; // Sept 1 to 7
              const dateStr = `2026-09-${String(weekDayNum).padStart(2, '0')}`;
              const dayEvents = events.filter((e) => e.date === dateStr);

              return (
                <div
                  key={day}
                  className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 min-h-[140px] space-y-2"
                >
                  <div className="text-center border-b border-slate-200/60 dark:border-slate-700 pb-1">
                    <div className="text-[10px] uppercase font-extrabold text-slate-400">{day}</div>
                    <div className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{weekDayNum}</div>
                  </div>

                  <div className="space-y-1.5">
                    {dayEvents.map((e) => (
                      <div
                        key={e.id}
                        className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 text-[10px] space-y-0.5"
                      >
                        <div className="font-extrabold text-slate-900 dark:text-slate-100 truncate">{e.title}</div>
                        {e.time && (
                          <div className="flex items-center gap-1 text-[9px] text-slate-400">
                            <Clock size={10} /> {e.time}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
