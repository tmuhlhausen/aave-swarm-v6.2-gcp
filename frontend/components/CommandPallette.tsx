'use client';

import { useState } from 'react';

export default function CommandPalette({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const [command, setCommand] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      console.log('🎙️ Voice/Command executed:', command);
      // You can later forward real commands to the GKE WebSocket here
      alert(`Command sent to swarm: ${command}`);
      setCommand('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] backdrop-blur-xl">
      <div className="liquid-glass w-[560px] p-10 rounded-3xl border border-cyan-500/40 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="text-3xl font-bold tracking-widest glitch">VOICE / CMD PALETTE</div>
          <button 
            onClick={onClose}
            className="text-3xl text-red-400 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type or speak command... (e.g. AWAKEN SWARM, SCALE TO 20, STOP ALL)"
            className="w-full bg-black border border-cyan-500/50 text-white p-6 rounded-2xl text-xl font-mono placeholder:text-cyan-500/50 focus:outline-none focus:border-cyan-400"
            autoFocus
          />
          <div className="text-xs text-cyan-400/70 mt-3 font-mono text-center">Press ENTER or say the command</div>
          
          <button
            type="submit"
            className="mt-8 w-full py-5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 rounded-2xl text-xl font-bold tracking-widest hover:scale-105 transition-all"
          >
            EXECUTE COMMAND
          </button>
        </form>
      </div>
    </div>
  );
}
