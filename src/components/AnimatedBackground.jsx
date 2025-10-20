import { motion, useAnimation } from 'framer-motion';
import { Heart, Activity, Pill, Stethoscope, Syringe, Thermometer, Droplet, Zap, Shield, Plus } from 'lucide-react';
import { useEffect, useMemo } from 'react';

const AnimatedBackground = () => {
  const icons = useMemo(() => [
    { Icon: Heart, size: 'large', color: 'text-red-400/10' },
    { Icon: Activity, size: 'medium', color: 'text-blue-400/10' },
    { Icon: Pill, size: 'small', color: 'text-green-400/10' },
    { Icon: Stethoscope, size: 'large', color: 'text-cyan-400/10' },
    { Icon: Syringe, size: 'medium', color: 'text-purple-400/10' },
    { Icon: Thermometer, size: 'small', color: 'text-orange-400/10' },
    { Icon: Droplet, size: 'medium', color: 'text-blue-500/10' },
    { Icon: Zap, size: 'small', color: 'text-yellow-400/10' },
    { Icon: Shield, size: 'large', color: 'text-indigo-400/10' },
    { Icon: Plus, size: 'medium', color: 'text-teal-400/10' },
    { Icon: Heart, size: 'small', color: 'text-pink-400/10' },
    { Icon: Activity, size: 'large', color: 'text-cyan-500/10' },
  ], []);

  const sizeClasses = {
    small: 'w-12 h-12 md:w-16 md:h-16',
    medium: 'w-16 h-16 md:w-20 md:h-20',
    large: 'w-20 h-20 md:w-24 md:h-24',
  };

  // Generate multiple layers of particles for depth
  const generateParticles = (count, layer) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${layer}-${i}`,
      icon: icons[i % icons.length],
      startX: Math.random() * 100,
      endX: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 15 + (layer * 5),
      rotationSpeed: Math.random() > 0.5 ? 1 : -1,
      rotations: Math.floor(Math.random() * 3) + 1,
      opacity: layer === 1 ? 0.4 : layer === 2 ? 0.6 : 1,
    }));
  };

  const backgroundParticles = useMemo(() => {
    return [
      ...generateParticles(4, 1), // Far background - slower
      ...generateParticles(4, 2), // Middle layer
      ...generateParticles(4, 3), // Foreground - faster
    ];
  }, []);

  // Floating bubbles in the background
  const generateBubbles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `bubble-${i}`,
      size: 20 + Math.random() * 80,
      startX: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }));
  };

  const bubbles = useMemo(() => generateBubbles(8), []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Enhanced gradient background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-50/30 to-purple-50/20"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-cyan-50/20 to-teal-50/30"></div>
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-teal-200/20 to-cyan-200/20 rounded-full blur-3xl"
        animate={{
          x: [-50, 50, -50],
          y: [-50, 50, -50],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-white/40 to-blue-100/30 backdrop-blur-sm"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.startX}%`,
            bottom: -bubble.size,
          }}
          animate={{
            y: [-bubble.size, -(window.innerHeight + bubble.size)],
            x: [0, Math.sin(bubble.delay) * 100, 0],
            opacity: [0, 0.5, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Medical icons with layered depth */}
      {backgroundParticles.map((particle) => {
        const { Icon, size, color } = particle.icon;
        return (
          <motion.div
            key={particle.id}
            className={`absolute ${color}`}
            style={{
              left: `${particle.startX}%`,
              top: -100,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, window.innerHeight + 200],
              x: [
                0,
                Math.sin(particle.delay) * 150,
                Math.cos(particle.delay) * 150,
                0,
              ],
              rotate: [0, 360 * particle.rotationSpeed * particle.rotations],
              scale: [0.8, 1, 1.1, 1, 0.8],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon className={sizeClasses[size]} />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2E8BC0 1px, transparent 1px),
            linear-gradient(to bottom, #2E8BC0 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial gradient overlay for vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/30"></div>

      {/* Animated light rays */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            rgba(46, 139, 192, 0.1) 50px,
            rgba(46, 139, 192, 0.1) 51px
          )`,
        }}
        animate={{
          x: [-100, 100],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
