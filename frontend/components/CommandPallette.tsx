'use client';
import { useEffect } from 'react';

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]">
      <div className="liquid-glass w-[520px] p-8 rounded-3xl">
        <input className="w-full bg-transparent text-2xl outline-none" placeholder="Type command or speak..." autoFocus />
        <div className="mt-8 text-sm text-cyan-400">Try: “Awaken all agents” or “Show risk map”</div>
      </div>
    </div>
  );
}
