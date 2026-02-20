import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionSection({ id, title, subtitle, children, defaultOpen = false }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section id={id} className="scroll-mt-24 py-12 border-b border-white/5 last:border-0 relative bg-[#0a0f2c]">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between group"
      >
        <div className="flex flex-col gap-1 mb-4 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-4">
            <span className="w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></span>
            {title}
          </h2>
          {subtitle && (
            <p className="text-blue-200/60 text-sm md:text-base font-light ml-5 md:ml-6 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-3 text-blue-400 group-hover:text-blue-300 transition-colors ml-5 md:ml-0">
          <span className="text-xs font-medium tracking-wider uppercase opacity-80">
            {isOpen ? 'Close' : 'View Details'}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="p-2 bg-white/5 rounded-full border border-white/10 group-hover:bg-white/10"
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
