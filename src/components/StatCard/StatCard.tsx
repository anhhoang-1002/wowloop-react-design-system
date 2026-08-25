import React from 'react';

export interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
}) => {
  return (
    <div className="bg-white rounded-[15px] p-5 shadow-input-shadow border border-secondary/30 flex flex-col justify-between gap-3">
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs font-bold text-muted uppercase tracking-wider leading-relaxed flex-1 pr-2">
          {title}
        </span>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-secondary-bg text-secondary flex items-center justify-center shrink-0 shadow-xs">
            {icon}
          </div>
        )}
      </div>
      <div>
        <div className="text-3xl font-black text-secondary leading-tight mb-1">{value}</div>
        {change && (
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className={isPositive ? 'text-primary-vibrant font-bold' : 'text-danger font-bold'}>
              {isPositive ? '↑' : '↓'} {change}
            </span>
            <span className="text-muted font-normal">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};
