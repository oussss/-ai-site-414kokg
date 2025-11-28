import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Star, Box, Zap, Eye, Menu, X, MousePointer2 } from 'lucide-react';

const NeoButton = ({ children, color = 'bg-white', onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`
      relative px-8 py-4 font-display font-bold text-lg uppercase tracking-wider
      border-4 border-black ${color} text-black
      shadow-hard hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px]
      transition-all duration-150 ease-out z-10 ${className}
    `}
  >
    {children}
  </button>
);

const Marquee = ({ text, direction = 1, speed = 20 }) => (
  <div className="relative flex overflow-hidden border-y-4 border-black bg-neo-black text-neo-white py-4 rotate-1 scale-105 z-20">
    <motion.div
      className="flex whitespace-nowrap font-display text-4xl font-black"
      animate={{ x: direction === 1 ? [0, -1000] : [-1000, 0] }}
      transition={{ repeat: Infinity, ease: "linear", duration: speed }}
    >
      {[...Array(10)].map((_, i) => (
        <span key={i} className="mx-8 flex items-center">
          {text} <Star className="inline mx-4 w-8 h-8 fill-neo-yellow text-neo-yellow" />
        </span>
      ))}
    </motion.div>
  </div>
);

const ServiceCard = ({ title, icon: Icon, color, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ rotate: 2, scale: 1.02 }}
    className={`
      p-8 border-4 border-black bg-white shadow-hard flex flex-col justify-between
      h-[400px] group cursor-pointer relative overflow-hidden
    `}
  >
    <div className={`absolute top-0 right-0 w-24 h-24 border-l-4 border-b-4 border-black ${color} rounded-bl-full`} />
    <div>
      <Icon className="w-16 h-16 mb-6 stroke-[1.5]" />
      <h3 className="font-display text-3xl font-black mb-4 uppercase">{title}</h3>
      <p className="font-body text-lg font-medium leading-relaxed">{description}</p>
    </div>
    <div className="flex justify-end">
      <div className="rounded-full border-4 border-black p-3 group-hover:bg-black group-hover:text-white transition-colors">
        <ArrowRight className="w-8 h-8" />
      </div>
    </div>
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-start pointer-events-none">
      <div className="pointer-events-auto bg-neo-yellow border-4 border-black p-2 shadow-hard-sm">
        <h1 className="font-display text-2xl font-black tracking-tighter">PIXEL & CO.</h1>
      </div>
      <div className="pointer-events-auto">
         <button 
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white border-4 border-black p-3 shadow-hard-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
         >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
         </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-24 right-6 w-64 bg-neo-purple border-4 border-black shadow-hard p-6 flex flex-col gap-4 pointer-events-auto"
        >
          {['Work', 'Services', 'Manifesto', 'Contact'].map((item) => (
            <a key={item} href="#" className="font-display text-xl text-white hover:text-black hover:bg-neo-green border-2 border-transparent hover:border-black p-2 transition-all uppercase">
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20 bg-neo-yellow">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '40px 40px' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-center"
        >
          <h1 className="font-display text-[10vw] leading-[0.8] font-black text-black drop-shadow-[8px_8px_0_rgba(255,255,255,1)]">
            WE BUILD<br/>
            <span className="text-white drop-shadow-[8px_8px_0_rgba(0,0,0,1)] stroke-black">DIGITAL</span><br/>
            CHAOS
          </h1>
        </motion.div>

        <motion.div style={{ y: y1 }} className="flex justify-center mt-12 gap-6">
          <NeoButton color="bg-neo-pink">Start Project</NeoButton>
          <NeoButton color="bg-neo-blue">Explore</NeoButton>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div style={{ rotate }} className="absolute top-1/4 left-10 w-24 h-24 border-4 border-black bg-neo-green shadow-hard hidden md:block" />
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full border-4 border-black bg-neo-purple shadow-hard hidden md:flex items-center justify-center">
        <Eye className="w-16 h-16 text-white" />
      </motion.div>
    </section>
  );
};

const Manifesto = () => {
  return (
    <section className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h2 className="font-display text-7xl font-black mb-8 leading-none">
              NO<br/>BORING<br/><span className="text-neo-pink">WEBSITES</span>
            </h2>
            <p className="font-body text-xl font-bold border-l-8 border-neo-yellow pl-6 mb-8">
              We reject the sterile, the minimal, and the safe. We believe in raw interactions, bold contrasts, and user interfaces that punch you in the face (metaphorically). 
            </p>
            <NeoButton color="bg-black text-white">Read the manifesto</NeoButton>
          </div>
          <div className="md:w-1/2 relative">
             <div className="aspect-square bg-neo-blue border-4 border-black shadow-hard-xl rotate-3 flex items-center justify-center overflow-hidden group">
                <motion.div 
                  className="font-display text-9xl text-white opacity-20 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  ✸
                </motion.div>
             </div>
             <div className="absolute -bottom-12 -left-12 bg-neo-yellow border-4 border-black p-4 font-bold font-display text-2xl shadow-hard">
               EST. 2024
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Services = () => {
  const services = [
    { title: "Web Design", icon: Box, color: "bg-neo-pink", description: "Layouts that break the grid and rebuild it in 4D space." },
    { title: "Development", icon: Zap, color: "bg-neo-green", description: "Clean code, dirty aesthetic. React, Three.js, WebGL wizardry." },
    { title: "Branding", icon: Star, color: "bg-neo-blue", description: "Logos that scream louder than your competitors." },
  ];

  return (
    <section className="py-32 bg-neo-black text-white border-t-4 border-black">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-20">
           <h2 className="font-display text-6xl md:text-8xl text-white font-black">
             OUR<br/><span className="text-neo-yellow stroke-white">TOOLKIT</span>
           </h2>
           <div className="hidden md:block">
             <ArrowRight className="w-24 h-24 text-neo-green" />
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-black">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="h-[300vh] bg-neo-white relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 pl-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="relative flex-shrink-0 w-[80vw] md:w-[60vw] h-[70vh] border-4 border-black bg-white shadow-hard flex items-center justify-center overflow-hidden">
               <div className={`absolute inset-0 bg-[url('https://source.unsplash.com/random/800x600?abstract&sig=${i}')] bg-cover grayscale hover:grayscale-0 transition-all duration-500`} />
               <div className="absolute inset-0 bg-black/20" />
               <div className="relative bg-neo-yellow border-4 border-black p-4">
                  <h3 className="font-display text-4xl font-black">PROJECT 0{i}</h3>
               </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neo-yellow border-t-4 border-black py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-display text-[12vw] leading-none font-black mb-12 hover:text-white transition-colors cursor-default">
          LET'S TALK
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-20">
          <NeoButton color="bg-white" className="text-2xl">hello@pixel.co</NeoButton>
          <NeoButton color="bg-black text-white" className="text-2xl">Start a project</NeoButton>
        </div>
        
        <div className="flex justify-between items-end border-t-4 border-black pt-8 font-body font-bold text-lg">
          <div>
            © 2024 Pixel & Co.<br/>
            All Rights Reserved.
          </div>
          <div className="flex gap-4">
             <a href="#" className="hover:bg-black hover:text-white px-2 transition-colors">TW</a>
             <a href="#" className="hover:bg-black hover:text-white px-2 transition-colors">IG</a>
             <a href="#" className="hover:bg-black hover:text-white px-2 transition-colors">LI</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="bg-neo-white selection:bg-black selection:text-neo-yellow">
      <Navbar />
      <Hero />
      <Marquee text="WE BREAK THINGS  •  WE FIX THINGS  •  " direction={1} />
      <Manifesto />
      <Marquee text="DESIGN  •  DEVELOPMENT  •  STRATEGY  •  " direction={-1} speed={15} />
      <Services />
      <Gallery />
      <Footer />
      
      {/* Custom Cursor Element - simple implementation */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
            translateX: useSpring(useMotionValue(0), { stiffness: 500, damping: 28 }),
            translateY: useSpring(useMotionValue(0), { stiffness: 500, damping: 28 })
        }}
        ref={(ref) => {
            if(!ref) return;
            const moveCursor = (e) => {
                ref.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
            }
            window.addEventListener('mousemove', moveCursor);
            return () => window.removeEventListener('mousemove', moveCursor);
        }}
      />
    </div>
  );
}

export default App;