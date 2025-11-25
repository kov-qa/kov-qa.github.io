import React, { useState } from 'react';
import { SocialLink } from '../types';
import { CheckIcon, CopyIcon, ExternalLinkIcon } from './Icons';

interface SocialCardProps {
  link: SocialLink;
  onCopy?: (text: string, platform: string) => void;
}

const SocialCard: React.FC<SocialCardProps> = ({ link, onCopy }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justCopied, setJustCopied] = useState(false);

  const handleClick = () => {
    if (link.action === 'copy') {
      if (onCopy) onCopy(link.username, link.platform);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
    } else if (link.action === 'link' && link.url) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
  };

  const Icon = link.icon;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative w-full p-5 rounded-[2rem] flex items-center justify-between
        transition-all duration-500
        glass-panel
        ${isHovered ? 'translate-y-[-2px] scale-[1.01]' : 'translate-y-0 scale-100'}
      `}
    >
      <div className="flex items-center gap-5 z-10">
        <div 
          className="p-3.5 rounded-2xl transition-all duration-500 shadow-inner border border-white/5"
          style={{ 
            backgroundColor: isHovered ? `${link.color}20` : 'rgba(255,255,255,0.03)',
            color: isHovered ? link.color : 'rgba(255,255,255,0.7)',
            boxShadow: isHovered ? `0 0 20px ${link.color}30` : 'none'
          }}
        >
          <Icon className="w-7 h-7" />
        </div>
        <div className="text-left space-y-0.5">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">{link.platform}</h3>
          <p className="text-lg font-bold text-white tracking-wide group-hover:text-white transition-colors">{link.username}</p>
        </div>
      </div>

      <div className="text-white/30 group-hover:text-white transition-colors duration-300 z-10 pr-2">
        {justCopied ? (
          <CheckIcon className="w-5 h-5 text-green-400" />
        ) : link.action === 'copy' ? (
          <CopyIcon className="w-5 h-5" />
        ) : (
          <ExternalLinkIcon className="w-5 h-5" />
        )}
      </div>

      {/* Subtle Gradient Glow on Hover */}
      <div 
        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${link.color}15, transparent 70%)`
        }}
      />
    </button>
  );
};

export default SocialCard;