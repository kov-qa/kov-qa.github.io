import React, { useState, useEffect, useRef } from 'react';
import { SocialLink } from './types';
import { DiscordIcon, RobloxIcon, TelegramIcon } from './components/Icons';
import SocialCard from './components/SocialCard';
import Notification from './components/Notification';

// Configuration for the links
const LINKS: SocialLink[] = [
  {
    id: 'telegram',
    platform: 'Telegram',
    username: 'aerophobes',
    url: 'https://t.me/aerophobes',
    action: 'link',
    color: '#229ED9', // Telegram Blue
    icon: TelegramIcon,
  },
  {
    id: 'discord',
    platform: 'Discord',
    username: '1kovi',
    url: 'discord://-/users/966020915525718056', // Deep link to user profile
    action: 'link',
    color: '#5865F2', // Discord Blurple
    icon: DiscordIcon,
  },
  {
    id: 'roblox',
    platform: 'Roblox',
    username: 'kovrik_nikto',
    url: 'https://www.roblox.com/users/2891323514/profile',
    action: 'link',
    color: '#FFFFFF', // White for Roblox in this dark theme
    icon: RobloxIcon,
  }
];

const App: React.FC = () => {
  const [notification, setNotification] = useState({ show: false, message: '' });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for dynamic background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCopy = async (text: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotification({
        show: true,
        message: `Copied ${platform} username!`
      });
    } catch (err) {
      console.error('Failed to copy:', err);
      setNotification({
        show: true,
        message: 'Failed to copy to clipboard'
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black text-slate-200"
    >
      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.06), transparent 40%),
            radial-gradient(1200px circle at 50% 50%, #050505, #000000 100%)
          `
        }}
      />
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

      <main className="w-full max-w-md z-10 flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Header Profile Section */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur opacity-30 group-hover:opacity-60 transition duration-700"></div>
            <div className="relative w-32 h-32 rounded-full p-1 bg-black/40 backdrop-blur-sm border border-white/10 ring-1 ring-white/5 overflow-hidden shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                 alt="Kovrik Avatar" 
                 className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-700 ease-in-out"
               />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-lg">
              Kovrik
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/30"></div>
              <p className="text-white/50 font-medium text-sm tracking-[0.2em] uppercase">
                Social Hub
              </p>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/30"></div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="flex flex-col gap-5">
          {LINKS.map((link) => (
            <SocialCard 
              key={link.id} 
              link={link} 
              onCopy={handleCopy} 
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center pt-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
           <p className="text-xs font-light tracking-widest text-white/60">
             © {new Date().getFullYear()} KOVRIK
           </p>
        </footer>

      </main>

      <Notification 
        isVisible={notification.show} 
        message={notification.message}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default App;