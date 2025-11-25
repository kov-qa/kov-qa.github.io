import React, { useEffect, useState } from 'react';
import { CheckIcon } from './Icons';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, isVisible, onClose }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl border border-white/10">
        <div className="bg-green-500/20 p-1 rounded-full text-green-400">
          <CheckIcon className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium text-white">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
