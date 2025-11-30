import React from 'react';

export interface SocialLink {
  id: string;
  platform: 'Telegram' | 'Discord' | 'Roblox' | 'GitHub';
  username: string;
  url?: string;
  action: 'link' | 'copy';
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}