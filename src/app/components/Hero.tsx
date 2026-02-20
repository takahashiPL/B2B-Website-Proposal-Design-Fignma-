import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import imgBg from "@/assets/e5d848128bf19ac3f9f8fe3469a57ec2410531ad.png";
import { siteContent } from '../data/siteContent';

export function Hero() {
  return (
    <div id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12">
      {/* Background with abstract effects */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imgBg} 
          alt="Abstract Background" 
          className="w-full h-full object-cover object-center brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2c] via-transparent to-[#0a0f2c]/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0f2c]/60 to-[#0a0f2c]"></div>
      </div>

      <div className="relative z-10 container max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-3/5 space-y-6 text-left"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm text-blue-200 text-sm font-medium mb-4 tracking-wider">
            {siteContent.hero.tagline}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-lg">
            {siteContent.hero.title.split('\n').map((line, i) => (
              <span key={i}>
                {i === 1 ? (
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200">
                     {line}
                   </span>
                ) : (
                  <>
                    {line}
                    {i < siteContent.hero.title.split('\n').length - 1 && <br />}
                  </>
                )}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-blue-100/80 max-w-xl font-light leading-relaxed">
            {siteContent.hero.description.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < siteContent.hero.description.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-8">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transform hover:-translate-y-1 flex items-center justify-center gap-2 group text-base"
            >
              {siteContent.hero.primaryButton}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2 text-base"
            >
              {siteContent.hero.secondaryButton}
            </button>
          </div>
        </motion.div>

        {/* Right Side: Decorative or Abstract Visuals (optional but nice for balance) */}
        <div className="hidden md:block w-2/5 relative h-[500px]">
          {/* Abstract geometric shapes using CSS */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-500/10 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-blue-400/10 rounded-full"
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('points')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll Down</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </div>
  );
}
