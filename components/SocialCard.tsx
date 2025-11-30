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
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={`
        group relative w-full aspect-square flex flex-col items-center justify-center
        glass-panel rounded-2xl overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-white/50
        transition-all duration-300 hover:-translate-y-1 active:scale-95 active:bg-white/10
      `}
      style={{
        zIndex: isHovered ? 20 : 1,
      }}
    >
      {/* Background Glow on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${link.color}15 0%, transparent 80%)`
        }}
      />

      {/* Top Right Action Icon */}
      <div className="absolute top-3 right-3 text-white/20 group-hover:text-white/60 transition-colors">
         {justCopied ? (
          <CheckIcon className="w-3.5 h-3.5 text-green-400" />
        ) : link.action === 'copy' ? (
          <CopyIcon className="w-3.5 h-3.5" />
        ) : (
          <ExternalLinkIcon className="w-3.5 h-3.5" />
        )}
      </div>

      {/* Main Icon */}
      <div 
        className="text-3xl sm:text-4xl transition-all duration-300 mb-2 shrink-0"
        style={{ 
          color: isHovered ? link.color : 'rgba(255,255,255,0.9)',
          filter: isHovered ? `drop-shadow(0 0 15px ${link.color}40)` : 'none',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        <Icon />
      </div>

      {/* Text Info */}
      <div className="flex flex-col items-center text-center px-2 z-10 w-full">
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-0.5">
          {link.platform}
        </span>
        <span className="text-[11px] sm:text-xs font-medium text-white/90 truncate w-full px-1">
          {link.username}
        </span>
      </div>
    </button>
  );
};

export default SocialCard;