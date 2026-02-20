import React, { useState } from 'react';
import { StickyNav } from './components/StickyNav';
import { Hero } from './components/Hero';
import { AccordionSection } from './components/AccordionSection';
import { ContactForm } from './components/ContactForm';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { clsx } from 'clsx';
import { siteContent } from './data/siteContent';

export default function Proposal05() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f2c] text-white selection:bg-blue-500/30 font-sans">
      <StickyNav />
      
      <main className="relative">
        <Hero />

        {/* --- POINTS SECTION (Immediate below Hero, compact) --- */}
        <div id="points" className="bg-[#080c24] relative z-10 py-16 scroll-mt-20 border-b border-white/5">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-8">
              {siteContent.points.map((point, i) => (
                <div key={i} className="group relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-2xl hover:border-blue-500/30 transition-all duration-300">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-6xl font-black text-blue-500">{point.id}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">{point.id}</span>
                    {point.title}
                  </h3>
                  <p className="text-blue-200/80 mb-4 font-light">
                    {point.description}
                  </p>
                  <details className="group/details">
                    <summary className="text-sm text-blue-400 cursor-pointer hover:text-white transition-colors list-none flex items-center gap-2 outline-none">
                      詳細を見る <span className="group-open/details:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="pt-4 text-sm text-blue-200/60 leading-relaxed border-t border-white/5 mt-4">
                      <ul className="list-disc pl-4 space-y-1">
                        {point.details.map((detail, j) => (
                          <li key={j}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#0a0f2c] pb-32 space-y-0">
          
          {/* Business Content */}
          <AccordionSection 
            id="business" 
            title={siteContent.business.title} 
            subtitle={siteContent.business.subtitle}
            defaultOpen={true}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {siteContent.business.items.map((item, i) => (
                <div key={i} className={clsx("relative overflow-hidden border border-white/10 p-6 rounded-xl hover:border-blue-400/50 transition-all group bg-gradient-to-br", item.bg)}>
                  <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="text-lg font-bold mb-3 text-white flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    {item.icon} {item.title}
                  </h3>
                  <p className="text-blue-200/70 text-sm leading-relaxed mb-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </AccordionSection>

          {/* Process Section */}
          <AccordionSection 
            id="process" 
            title={siteContent.process.title}
            subtitle={siteContent.process.subtitle}
            defaultOpen={true}
          >
            <div className="relative pt-8 md:pt-12">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 opacity-30"></div>
              
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {siteContent.process.steps.map((step, i) => (
                  <div key={i} className="relative z-10">
                    <div className="w-24 h-24 mx-auto bg-[#0a0f2c] border-2 border-blue-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(59,130,246,0.1)] group hover:border-blue-400 transition-colors">
                       <div className="text-blue-400 font-bold text-lg leading-tight">STEP<br/><span className="text-2xl">{step.step}</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-blue-400 text-sm mb-4 font-medium">{step.sub}</p>
                    <p className="text-blue-200/60 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center bg-blue-900/10 py-4 rounded-lg border border-blue-500/20 max-w-2xl mx-auto">
                <p className="text-blue-200 text-sm">
                  {siteContent.process.notePart1}<span className="text-white font-bold border-b border-blue-400">{siteContent.process.noteHighlight}</span>{siteContent.process.notePart2}
                </p>
              </div>
            </div>
          </AccordionSection>

          {/* Achievements */}
          <AccordionSection 
            id="achievements" 
            title={siteContent.achievements.title}
            subtitle={siteContent.achievements.subtitle}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((num) => (
                <div key={num} className="aspect-video bg-[#0f1636] rounded-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group hover:border-blue-500/30 transition-all">
                  <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
                  <div className="text-center z-10">
                    <h3 className="font-bold text-white text-lg mb-2">案件実績 {num}</h3>
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                      準備中
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm transition-colors border-b border-transparent hover:border-white pb-0.5">
                {siteContent.achievements.moreButton} <ArrowUpRight size={14} />
              </button>
            </div>
          </AccordionSection>

          {/* Company */}
          <AccordionSection 
            id="company" 
            title={siteContent.company.title}
          >
            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                  <h3 className="text-lg font-bold mb-6 text-blue-200 border-b border-white/10 pb-2">{siteContent.company.basicInfo.title}</h3>
                  <dl className="space-y-4 text-sm">
                    {siteContent.company.basicInfo.items.map((row, i) => (
                      <div key={i} className="grid grid-cols-3 pb-2 last:pb-0">
                        <dt className="text-blue-200/60 font-medium">{row.label}</dt>
                        <dd className="col-span-2 text-white">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
               </div>
               <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                  <h3 className="text-lg font-bold mb-6 text-blue-200 border-b border-white/10 pb-2">{siteContent.company.attitude.title}</h3>
                  <ul className="space-y-4">
                     {siteContent.company.attitude.items.map((item, i) => (
                       <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                         <span className="bg-blue-500/20 text-blue-400 flex items-center justify-center w-5 h-5 rounded-full text-xs shrink-0 mt-0.5">✔</span>
                         {item}
                       </li>
                     ))}
                  </ul>
               </div>
            </div>
          </AccordionSection>

          {/* Contact Section */}
          <section id="contact" className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 scroll-mt-20">
            <div className="bg-gradient-to-r from-blue-900/40 to-[#0a0f2c] border border-blue-500/30 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden transition-all duration-500">
               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
               
               <AnimatePresence mode="wait">
                 {!isFormOpen ? (
                   <motion.div
                     key="contact-cards"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }}
                     transition={{ duration: 0.3 }}
                   >
                       <h2 className="text-3xl font-bold text-white mb-4 relative z-10">{siteContent.contact.title}</h2>
                       <p className="text-blue-200/80 mb-10 max-w-2xl mx-auto relative z-10">
                         {siteContent.contact.description.split('\n').map((line, i) => (
                            <span key={i}>
                                {line}
                                {i < siteContent.contact.description.split('\n').length - 1 && <br />}
                            </span>
                         ))}
                       </p>

                       <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 relative z-10 max-w-4xl mx-auto">
                         {/* Mail Card */}
                         <div className="bg-[#0f1636] p-8 rounded-xl border border-white/10 flex-1 hover:border-blue-500/50 transition-colors group">
                            <Mail className="w-10 h-10 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-xl mb-2">{siteContent.contact.formCard.title}</h3>
                            <p className="text-sm text-blue-200/50 mb-6">{siteContent.contact.formCard.description}</p>
                            <button 
                              onClick={() => setIsFormOpen(true)}
                              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-blue-900/50 transform group-hover:-translate-y-1"
                            >
                              {siteContent.contact.formCard.button}
                            </button>
                         </div>

                         {/* Info Card */}
                         <div className="bg-[#0f1636] p-8 rounded-xl border border-white/10 flex-1 flex flex-col justify-center items-center gap-6">
                            <div className="w-full text-left bg-white/5 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                                 <Phone size={20} />
                               </div>
                               <div>
                                 <div className="text-xs text-blue-200/50 mb-1">{siteContent.contact.infoCard.phone.label}</div>
                                 <a href={`tel:${siteContent.contact.infoCard.phone.value}`} className="text-sm text-white font-medium hover:text-blue-400 transition-colors block">
                                   {siteContent.contact.infoCard.phone.value}
                                 </a>
                               </div>
                            </div>
                            <div className="w-full text-left bg-white/5 p-4 rounded-lg flex flex-col gap-4">
                               <div className="flex flex-col sm:flex-row items-start gap-4">
                                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                                    <MapPin size={20} />
                                  </div>
                                  <div>
                                    <div className="text-xs text-blue-200/50 mb-1">{siteContent.contact.infoCard.address.label}</div>
                                    <div className="text-sm text-white leading-relaxed">
                                       {siteContent.contact.infoCard.address.value.split('\n').map((line, i) => (
                                           <span key={i}>
                                               {line}
                                               {i < siteContent.contact.infoCard.address.value.split('\n').length - 1 && <br />}
                                           </span>
                                       ))}
                                    </div>
                                  </div>
                               </div>
                               
                               {/* Map Embed */}
                               <div className="w-full h-48 rounded-lg overflow-hidden border border-white/10 relative bg-black/20 group">
                                 <iframe 
                                   width="100%" 
                                   height="100%" 
                                   frameBorder="0" 
                                   scrolling="no" 
                                   marginHeight={0} 
                                   marginWidth={0} 
                                   src={siteContent.contact.infoCard.address.googleMapEmbedUrl}
                                   className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                   title="Google Map"
                                 ></iframe>
                                 <a 
                                   href={siteContent.contact.infoCard.address.googleMapUrl}
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   className="absolute inset-0 z-10"
                                   aria-label="View on Google Maps"
                                 />
                               </div>
                            </div>
                         </div>
                       </div>
                   </motion.div>
                 ) : (
                   <motion.div
                     key="contact-form"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }}
                     transition={{ duration: 0.3 }}
                     className="relative z-10 text-left max-w-4xl mx-auto"
                   >
                     <ContactForm onClose={() => setIsFormOpen(false)} />
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </section>

        </div>

        <footer className="bg-[#050818] py-8 text-center border-t border-white/5 relative z-10">
          <div className="text-blue-200/40 text-xs">
            {siteContent.footer.copyright}
          </div>
        </footer>
      </main>
    </div>
  );
}