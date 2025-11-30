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
        group relative h-20 flex items-center justify-center
        glass-panel overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-white/50
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isHovered ? 'w-80 rounded-[2rem]' : 'w-20 rounded-full'}
      `}
      style={{
        zIndex: isHovered ? 50 : 1,
        boxShadow: isHovered 
          ? `0 10px 40px -10px ${link.color}30, inset 0 0 20px rgba(255,255,255,0.05)` 
          : '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at center, ${link.color}10 0%, transparent 70%)`
        }}
      />

      {/* Content Wrapper - Keeps content centered in flex */}
      <div className="flex items-center justify-center relative z-10">
        
        {/* Icon */}
        <div 
          className="text-3xl transition-all duration-500 shrink-0"
          style={{ 
            color: isHovered ? link.color : 'rgba(255,255,255,0.9)',
            filter: isHovered ? `drop-shadow(0 0 8px ${link.color}60)` : 'none',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          <Icon />
        </div>

        {/* Text Container - Expands smoothly */}
        <div 
          className={`
            flex flex-col items-start overflow-hidden whitespace-nowrap
            transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${isHovered ? 'w-40 ml-5 opacity-100' : 'w-0 ml-0 opacity-0'}
          `}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5">
            {link.platform}
          </span>
          <span className="text-lg font-bold text-white tracking-wide">
            {link.username}
          </span>
        </div>
      </div>

      {/* Action Indicator (Arrow/Check) - Fades in on the far right */}
      <div 
        className={`
          absolute right-6 text-white/20 transition-all duration-500
          ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
        `}
      >
        {justCopied ? (
          <CheckIcon className="w-5 h-5 text-green-400" />
        ) : link.action === 'copy' ? (
          <CopyIcon className="w-5 h-5" />
        ) : (
          <ExternalLinkIcon className="w-5 h-5" />
        )}
      </div>
    </button>
  );
};

export default SocialCard;