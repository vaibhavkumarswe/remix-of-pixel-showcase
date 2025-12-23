import { useEffect, useRef, useCallback } from 'react';
import { useAppSelector } from '@/store/hooks';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
}

interface ParticleSystemProps {
  particleCount?: number;
  mouseInfluence?: number;
  className?: string;
}

export const ParticleSystem = ({
  particleCount = 60,
  mouseInfluence = 150,
  className = ''
}: ParticleSystemProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number>();
  const theme = useAppSelector((state) => state.theme.mode);

  const createParticle = useCallback((width: number, height: number, atMouse = false): Particle => {
    const x = atMouse && mouseRef.current.active 
      ? mouseRef.current.x + (Math.random() - 0.5) * 50
      : Math.random() * width;
    const y = atMouse && mouseRef.current.active 
      ? mouseRef.current.y + (Math.random() - 0.5) * 50
      : Math.random() * height;
    
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      hue: Math.random() > 0.5 ? 187 : 262, // primary or accent
      life: Math.random() * 200,
      maxLife: 200 + Math.random() * 100
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(canvas.width, canvas.height)
    );

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const isDark = theme === 'dark';

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Mouse influence
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseInfluence) {
            const force = (mouseInfluence - distance) / mouseInfluence;
            const angle = Math.atan2(dy, dx);
            
            // Particles are attracted but orbit around cursor
            particle.vx += Math.cos(angle + Math.PI / 2) * force * 0.03;
            particle.vy += Math.sin(angle + Math.PI / 2) * force * 0.03;
            
            // Slight attraction
            particle.vx += Math.cos(angle) * force * 0.01;
            particle.vy += Math.sin(angle) * force * 0.01;
          }
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Update life
        particle.life++;
        
        // Calculate opacity based on life
        const lifeRatio = particle.life / particle.maxLife;
        const fadeOpacity = lifeRatio < 0.1 
          ? lifeRatio * 10 
          : lifeRatio > 0.9 
            ? (1 - lifeRatio) * 10 
            : 1;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Reset particle if life ended
        if (particle.life > particle.maxLife) {
          particlesRef.current[index] = createParticle(canvas.width, canvas.height, true);
          return;
        }

        // Draw particle
        const lightness = isDark ? '53%' : '43%';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 85%, ${lightness}, ${particle.opacity * fadeOpacity})`;
        ctx.fill();

        // Draw glow for larger particles
        if (particle.size > 2) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${particle.hue}, 85%, ${lightness}, ${particle.opacity * fadeOpacity * 0.2})`;
          ctx.fill();
        }

        // Connect nearby particles with lines
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index >= otherIndex) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsla(${particle.hue}, 85%, ${lightness}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, mouseInfluence, createParticle, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ mixBlendMode: theme === 'dark' ? 'screen' : 'multiply' }}
    />
  );
};
