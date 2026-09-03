import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, Clock, ShieldAlert, Sparkles, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type?: 'system' | 'alert' | 'feature';
}

export interface NotificationDropdownProps {
  notifications?: NotificationItem[];
  archivedNotifications?: NotificationItem[];
  onMarkAllAsRead?: () => void;
  showTabs?: boolean;
  className?: string;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications: initialNotifications = [
    {
      id: '1',
      title: 'Retention Campaign Deployed',
      description: 'Automated win-back sequence sent to 3,420 subscribers.',
      time: '5m ago',
      read: false,
      type: 'alert',
    },
    {
      id: '2',
      title: 'LibreChat System Sync',
      description: 'v0.7.5 update successfully synchronized with Wowloop SaaS.',
      time: '1h ago',
      read: false,
      type: 'feature',
    },
    {
      id: '3',
      title: 'Monthly MRR Milestone',
      description: 'Subscription revenue hit $52,400 MRR benchmark.',
      time: '1d ago',
      read: true,
      type: 'system',
    },
  ],
  archivedNotifications: initialArchived = [
    {
      id: '4',
      title: 'Webhook Latency Alert Resolved',
      description: 'Response latency normalized back under 120ms.',
      time: '3d ago',
      read: true,
      type: 'alert',
    },
    {
      id: '5',
      title: 'New Admin Invited',
      description: 'wowadmin@wowsuite.ai joined workspace.',
      time: '5d ago',
      read: true,
      type: 'system',
    },
  ],
  onMarkAllAsRead,
  showTabs = true,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'archived'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [archived, setArchived] = useState<NotificationItem[]>(initialArchived);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    if (onMarkAllAsRead) onMarkAllAsRead();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left select-none", className)}>
      {/* Bell Icon Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-secondary dark:hover:text-blue-400 hover:bg-slate-200/70 dark:hover:bg-slate-700 transition-colors focus:outline-none"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in-0 zoom-in-95">
          {/* Popover Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-secondary-bg dark:bg-blue-950 text-secondary dark:text-blue-400 font-extrabold px-2 py-0.5 rounded-full border border-secondary/20 dark:border-blue-800/40">
                  {unreadCount} Unread
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-1 text-[11px] font-bold text-secondary dark:text-blue-400 hover:underline"
              >
                <CheckCheck size={13} /> Mark all read
              </button>
            )}
          </div>

          {/* Optional 2 Tabs Header Switcher */}
          {showTabs && (
            <div className="flex bg-slate-100/80 dark:bg-slate-800/50 p-1 border-b border-slate-200/60 dark:border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'all'
                    ? 'bg-white dark:bg-slate-700 text-secondary dark:text-blue-400 shadow-xs font-extrabold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>All Activity</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {notifications.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('archived')}
                className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'archived'
                    ? 'bg-white dark:bg-slate-700 text-secondary dark:text-blue-400 shadow-xs font-extrabold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Archived</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {archived.length}
                </span>
              </button>
            </div>
          )}

          {/* Notification Items List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
            {(!showTabs || activeTab === 'all') && (
              notifications.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">No notifications</div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "p-3.5 flex items-start gap-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer",
                      !item.read && "bg-blue-50/40 dark:bg-slate-800/30"
                    )}
                  >
                    <div className="mt-0.5 p-1.5 rounded-lg bg-secondary-bg dark:bg-blue-950 text-secondary dark:text-blue-400 shrink-0">
                      {item.type === 'alert' && <ShieldAlert size={15} />}
                      {item.type === 'feature' && <Sparkles size={15} />}
                      {item.type === 'system' && <Clock size={15} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={cn("text-xs font-bold truncate", item.read ? "text-slate-700 dark:text-slate-300" : "text-slate-900 dark:text-slate-100 font-extrabold")}>
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-secondary dark:bg-blue-400 shrink-0 mt-1.5" />
                    )}
                  </div>
                ))
              )
            )}

            {showTabs && activeTab === 'archived' && (
              archived.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">No archived notifications</div>
              ) : (
                archived.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors opacity-80"
                  >
                    <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 shrink-0">
                      <Clock size={15} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{item.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
