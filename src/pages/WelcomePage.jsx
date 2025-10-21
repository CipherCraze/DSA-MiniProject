import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationControls } from 'framer-motion';
import { Pill, Ambulance, Calendar, Map, Sparkles, Shield, Heart, TrendingUp, Users, Clock, Award, CheckCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ButtonCard from '../components/ButtonCard';
import AnimatedBackground from '../components/AnimatedBackground';

const WelcomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const controls = useAnimationControls();
  const featuresRef = useRef(null);

  // Parallax effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;
      setMousePosition({ x, y });
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const features = [
    {
      icon: Pill,
      label: 'Pharmacy Management',
      path: '/pharmacy',
      color: 'from-emerald-400 to-cyan-500',
      description: 'Manage inventory, track expiry dates, and monitor stock levels efficiently.',
    },
    {
      icon: Ambulance,
      label: 'Emergency Triage',
      path: '/triage',
      color: 'from-red-400 to-orange-500',
      description: 'Prioritize patients based on severity and allocate doctors effectively.',
    },
    {
      icon: Calendar,
      label: 'Doctor Appointments',
      path: '/appointments',
      color: 'from-blue-400 to-cyan-500',
      description: 'Schedule appointments, view availability, and manage bookings seamlessly.',
    },
    {
      icon: Map,
      label: 'Hospital Navigation',
      path: '/navigation',
      color: 'from-indigo-400 to-blue-600',
      description: 'Find the shortest path to any department using smart navigation system.',
    },
  ];

  const benefits = [
    { icon: Shield, title: 'Secure & Compliant', description: 'HIPAA compliant with end-to-end encryption' },
    { icon: TrendingUp, title: 'Boost Efficiency', description: 'Reduce wait times by up to 40%' },
    { icon: Users, title: 'Patient-Centric', description: 'Enhanced patient satisfaction scores' },
    { icon: Clock, title: '24/7 Availability', description: 'Round-the-clock system access' },
  ];

  const stats = [
    { value: '500+', label: 'Medicines', icon: Pill, color: 'from-green-400 to-emerald-500' },
    { value: '50+', label: 'Doctors', icon: Heart, color: 'from-red-400 to-pink-500' },
    { value: '1000+', label: 'Patients', icon: Users, color: 'from-blue-400 to-cyan-500' },
    { value: '24/7', label: 'Support', icon: Clock, color: 'from-purple-400 to-indigo-500' },
  ];

  const achievements = [
    { icon: Award, text: 'Best Hospital Management System 2025' },
    { icon: CheckCircle, text: '99.9% Uptime Guarantee' },
    { icon: Sparkles, text: 'AI-Powered Insights' },
  ];

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Floating orbs that follow mouse */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-96 h-96 bg-highlight/5 rounded-full blur-3xl pointer-events-none"
        style={{
          x: useTransform(smoothMouseX, (x) => -x / 2),
          y: useTransform(smoothMouseY, (y) => -y / 2),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        {/* Hero Section with Enhanced Animations */}
        <motion.div
          style={{ y: y1, opacity }}
          className="text-center mb-16 md:mb-24"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-highlight/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-primary/20"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Trusted by 100+ Healthcare Facilities</span>
          </motion.div>

          {/* Main Title with Gradient & Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <motion.span
                className="inline-block bg-gradient-to-r from-primary via-highlight to-secondary bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Hospital Management
              </motion.span>
              <br />
              <span className="text-textPrimary">Made Simple</span>
            </h1>
          </motion.div>

          {/* Subtitle with Typewriter Effect */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-textSecondary max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Smart. Efficient. Reliable Healthcare Operations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(46, 139, 192, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToFeatures}
              className="px-8 py-4 bg-gradient-to-r from-primary to-highlight text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all"
            >
              Get Started Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-primary rounded-xl font-semibold text-lg border-2 border-primary/20 hover:border-primary/40 transition-all"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Achievement Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/10"
              >
                <achievement.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-textPrimary font-medium">{achievement.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Feature Cards with 3D Tilt Effect */}
        <motion.div
          ref={featuresRef}
          style={{ y: y2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d"
              }}
            >
              <ButtonCard {...feature} />
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-textPrimary mb-12"
          >
            Why Choose Our Platform?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="bg-gradient-to-br from-primary/10 to-highlight/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-textPrimary mb-2">{benefit.title}</h3>
                <p className="text-textSecondary">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
                className="relative group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border-2 border-transparent group-hover:border-primary/30 transition-all shadow-lg hover:shadow-2xl">
                  {/* Icon Badge */}
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Animated Number */}
                  <motion.div
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-textSecondary font-medium">{stat.label}</div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-highlight/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call-to-Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary via-highlight to-secondary rounded-3xl p-12 md:p-16 text-center relative">
            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
              animate={{
                backgroundPosition: ['0px 0px', '30px 30px'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold text-white mb-6"
              >
                Ready to Transform Your Healthcare Operations?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              >
                Join hundreds of healthcare facilities already using our platform
              </motion.p>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-primary rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-2xl"
              >
                Start Your Free Trial
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;
