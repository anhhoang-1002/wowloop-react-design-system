import React from 'react';
import { Repeat } from 'lucide-react';

export interface WowloopNavItemProps {
  isActive?: boolean;
  onClick?: () => void;
}

/**
 * WowloopNavItem Example for LibreChat:
 * Can be added to LibreChat's `client/src/components/Nav/Nav.tsx` or sidebar menu
 * with zero impact on LibreChat's default routing or chat features.
 */
export const WowloopNavItem: React.FC<WowloopNavItemProps> = ({ isActive = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-semibold transition-colors
        ${isActive ? 'bg-secondary-bg text-secondary' : 'text-slate-700 hover:bg-slate-100'}
      `}
    >
      <Repeat className={`h-4 w-4 ${isActive ? 'text-secondary' : 'text-slate-500'}`} />
      <span>Wowloop SaaS</span>
      <span className="ml-auto text-[10px] bg-primary-vibrant text-white font-bold px-1.5 py-0.5 rounded-full">
        PRO
      </span>
    </button>
  );
};
