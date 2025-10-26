'use client';

import { useEffect } from 'react';

const ParticleBackground = () => {
  useEffect(() => {
    const createParticles = () => {
      const container = document.getElementById('particles-js');
      if (!container) return;

      // Clear any existing particles
      container.innerHTML = '';

      // Create 16 particles
      for (let i = 0; i < 16; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties for each particle
        const size = Math.random() * 12 + 8; // 8-20px
        const x = Math.random() * 100; // 0-100%
        const y = Math.random() * 100; // 0-100%
        const duration = Math.random() * 20 + 10; // 10-30s
        const delay = Math.random() * 5; // 0-5s delay
        const colors = ['#9acd32', '#b8e6b8', '#7ba05b', '#a8d8a8'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          left: ${x}%;
          top: ${y}%;
          opacity: 0.6;
          animation: float ${duration}s ease-in-out infinite;
          animation-delay: ${delay}s;
          pointer-events: none;
          z-index: -1;
        `;

        container.appendChild(particle);
      }

      // Add CSS animations
      const style = document.createElement('style');
      style.textContent = `
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-10px, -30px) scale(0.9);
            opacity: 0.4;
          }
          75% {
            transform: translate(-20px, 10px) scale(1.05);
            opacity: 0.7;
          }
        }
        
        .particle:hover {
          transform: scale(1.5) !important;
          opacity: 1 !important;
          transition: all 0.3s ease;
        }
      `;
      
      document.head.appendChild(style);
    };

    // Create particles after component mounts
    setTimeout(createParticles, 100);

    // Cleanup function
    return () => {
      const container = document.getElementById('particles-js');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      id="particles-js" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'transparent',
        overflow: 'hidden'
      }}
    />
  );
};

export default ParticleBackground;