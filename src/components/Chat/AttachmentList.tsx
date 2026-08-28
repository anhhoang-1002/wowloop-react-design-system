import React from 'react';
import { FileText, Image as ImageIcon, X } from 'lucide-react';

export interface FileAttachment {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'file';
  previewUrl?: string;
}

export interface AttachmentListProps {
  files: FileAttachment[];
  onRemoveFile: (id: string) => void;
}

export const AttachmentList: React.FC<AttachmentListProps> = ({ files, onRemoveFile }) => {
  if (files.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 px-3 pt-2 pb-1 border-b border-slate-100 dark:border-slate-700/60">
      {files.map((file) => (
        <div
          key={file.id}
          className="group relative flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-xs text-slate-700 dark:text-slate-200 shadow-2xs select-none transition-all"
        >
          {file.type === 'image' && file.previewUrl ? (
            <img src={file.previewUrl} alt={file.name} className="w-5 h-5 rounded object-cover" />
          ) : file.type === 'image' ? (
            <ImageIcon size={14} className="text-blue-500 shrink-0" />
          ) : (
            <FileText size={14} className="text-emerald-500 shrink-0" />
          )}

          <div className="flex flex-col max-w-[120px] truncate">
            <span className="font-semibold text-[11px] truncate leading-tight">{file.name}</span>
            <span className="text-[9px] text-slate-400 dark:text-slate-400 font-mono">{file.size}</span>
          </div>

          <button
            onClick={() => onRemoveFile(file.id)}
            className="p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-400 hover:text-slate-700 dark:hover:text-slate-100 transition-colors ml-1"
            title="Remove attachment"
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
};
