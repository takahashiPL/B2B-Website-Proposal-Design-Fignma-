import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { siteContent } from "../data/siteContent";
import logoSvgRaw from "../../assets/PL_LOGO_vector.svg?raw";

const logoSvg = logoSvgRaw
  .replace(/<\?xml[^>]*\?>\s*/g, "")
  .replace(/<!DOCTYPE[^>]*>\s*/g, "")
  // アウトラインレイヤーを消す
  .replace(/<g id="Font_x5F_LineBase">/g, '<g id="Font_x5F_LineBase" opacity="0">')
  // SVG内の width/height を消して、CSSでサイズ制御できるようにする
  .replace(/\s(width|height)="[^"]*"/g, "")
  // 太字レイヤー消すと黒文字が見えなくなる
  .replace(/fill="#0C0B0B"/g, 'fill="currentColor"');

export function StickyNav() {
  const [activeId, setActiveId] = useState("top");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isNavigating = React.useRef(false);
  const timerRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  // Close menu on scroll
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isScrolled]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (isNavigating.current) return;

      // Adjust offset to avoid highlighting the next section too early
      // 100px provides a good balance: it's slightly more than the nav height (approx 80px),
      // ensuring that when we click a nav link (scrolling to offsetTop - 80),
      // the calculation (offsetTop - 80 + 100 = offsetTop + 20) falls strictly within the target section.
      const scrollPosition = window.scrollY + 100;

      let currentId = "top";

      for (let i = 0; i < siteContent.nav.items.length; i++) {
        const item = siteContent.nav.items[i];
        const element = document.getElementById(item.id);

        if (element) {
          const { offsetTop, offsetHeight } = element;

          // For the last item, we extend the hit area to the bottom of the document
          // to account for the footer or short contact sections.
          const isLast = i === siteContent.nav.items.length - 1;

          if (
            scrollPosition >= offsetTop &&
            (isLast ||
              scrollPosition < offsetTop + offsetHeight)
          ) {
            currentId = item.id;
          }
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    isNavigating.current = true;
    setActiveId(id);
    setIsMenuOpen(false); // Close mobile menu if open

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        offset;
      window.scrollTo({ top, behavior: "smooth" });
    }

    timerRef.current = setTimeout(() => {
      isNavigating.current = false;
    }, 1500);
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b border-white/5 backdrop-blur-md",
        isScrolled
          ? "bg-[#0a0f2c]/95 py-3 shadow-lg"
          : "bg-[#0a0f2c]/80 py-4",
      )}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo Area */}
        <div
          className="flex items-center gap-2 cursor-pointer group z-50 relative"
          onClick={() => scrollTo("top")}
        >
          <div
            className="h-8 w-auto text-white [&>svg]:h-8 [&>svg]:w-auto"
            aria-label="PlayLinks"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: logoSvg }}
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          {siteContent.nav.items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={clsx(
                "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 relative",
                activeId === item.id
                  ? "text-white"
                  : "text-blue-200/70 hover:text-white",
              )}
            >
              {activeId === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
              <span className="relative z-10">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Contact CTA in Nav (Desktop) */}
        <div className="hidden lg:block">
          <button
            onClick={() => scrollTo("contact")}
            className="px-4 py-2 bg-white text-[#0a0f2c] text-xs font-bold rounded hover:bg-blue-50 transition-colors"
          >
            {siteContent.nav.contactButton}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white p-2 z-50 relative rounded-full hover:bg-white/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Dropdown Portal */}
        {typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {isMenuOpen && (
                <div className="fixed inset-0 z-[9999] lg:hidden">
                  {/* Overlay - transparent but captures clicks */}
                  <div
                    className="absolute inset-0 bg-transparent"
                    onClick={() => setIsMenuOpen(false)}
                  />

                  {/* Menu */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{
                      duration: 0.15,
                      ease: "easeOut",
                    }}
                    className={clsx(
                      "absolute right-6 w-56 bg-[#0a0f2c] border border-white/10 rounded-xl shadow-2xl overflow-hidden origin-top-right backdrop-blur-xl",
                      isScrolled ? "top-[64px]" : "top-[80px]",
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col py-2">
                      {siteContent.nav.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollTo(item.id)}
                          className={clsx(
                            "px-6 py-3 text-left text-sm font-medium transition-colors hover:bg-white/5",
                            activeId === item.id
                              ? "text-blue-400"
                              : "text-gray-300",
                          )}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>
    </nav>
  );
}