import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function LoveSite() {
  const [step, setStep] = useState(0);
  const nopeRef = useRef(null);
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0 });

  const [confetti, setConfetti] = useState([]);
  const [fireflies, setFireflies] = useState([]);
  const cardRef = useRef(null);
  const [hearts, setHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [typing, setTyping] = useState(false);
  const [muted, setMuted] = useState(false);
  const musicRef = useRef(null);

  function dodgeNope() {
    const btn = nopeRef.current;
    const container = containerRef.current;
    if (!btn || !container) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    const padding = 10;
    const maxX = cRect.width - bRect.width - padding;
    const maxY = cRect.height - bRect.height - padding;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  }

  function teleportNope() {
    const btn = nopeRef.current;
    if (!btn) return;
    btn.style.transition = "none";
    dodgeNope();
    setTimeout(() => {
      btn.style.transition = "";
    }, 50);
    btn.classList.add("shake");
    setTimeout(() => btn.classList.remove("shake"), 500);
  }

  function showRandomTooltip() {
    const x = Math.random() * 250;
    const y = Math.random() * 120;
    setTooltip({ show: true, x, y });
    setTimeout(() => setTooltip({ show: false, x: 0, y: 0 }), 1000);
  }

  function burstConfetti() {
    const pieces = Array.from({ length: 25 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 400,
      color: `hsl(${Math.random() * 360} 80% 60%)`,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 3000);
  }

  function floatHearts() {
    const pieces = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      size: 20 + Math.random() * 20,
    }));
    setHearts(pieces);
    setTimeout(() => setHearts([]), 3500);
  }

  function spawnSparkles() {
    const pieces = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 6 + Math.random() * 12,
    }));
    setSparkles(pieces);
    setTimeout(() => setSparkles([]), 2500);
  }

  // fireflies generator (soft glowing dots that float slowly)
  function spawnFireflies() {
    const pieces = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      top: 20 + Math.random() * 60,
      size: 6 + Math.random() * 18,
      delay: Math.random() * 800,
    }));
    setFireflies(pieces);
    // fade after 6s
    setTimeout(() => setFireflies([]), 6000);
  }

  useEffect(() => {
    // spawn a soft batch of fireflies every 6s while on the page
    const iv = setInterval(() => {
      spawnFireflies();
    }, 6000);
    // initial spawn
    spawnFireflies();
    return () => clearInterval(iv);
  }, []);

  // parallax tilt handlers for mouse and touch
  function handleParallax(e) {
    const el = cardRef.current || document.querySelector('.card');
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (clientX - cx) / rect.width;
    const dy = (clientY - cy) / rect.height;
    const rx = (-dy * 6).toFixed(2);
    const ry = (dx * 6).toFixed(2);
    el.style.transform = `translate3d(0,0,0) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }

  function resetParallax() {
    const el = cardRef.current || document.querySelector('.card');
    if (el) el.style.transform = '';
  }

  async function fakeTyping(next) {
    setTyping(true);
    await new Promise(r => setTimeout(r, 800));
    setTyping(false);
    setStep(next);
  }

  const emojis = ["😭", "😂", "😅", "😬", "🙈", "😒", "💗", "💔"];

  useEffect(() => {
    if (step === 0) {
      const interval = setInterval(dodgeNope, 2500);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <>
      <style>
        {`
        @keyframes fadeIn { 
          0% { opacity: 0; transform: translateY(20px);} 
          100% { opacity: 1; transform: translateY(0);} 
        }
        @keyframes emojiFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity:0 }
          10% { opacity:1 }
          100% { transform: translateY(110vh) rotate(360deg); opacity:1 }
        }
        @keyframes slideLeft {
          0% { transform: translateX(50px); opacity:0; }
          100% { transform: translateX(0); opacity:1; }
        }
        @keyframes bubbleFloat {
          0% { transform: translateY(0); opacity:0.6 }
          100% { transform: translateY(-600px); opacity:0 }
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 8px rgba(255,255,255,0.4); }
          100% { box-shadow: 0 0 18px rgba(255,255,255,0.9); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
          75% { transform: translateX(-6px); }
        }

        .shake { animation: shake .4s; }

        .animated-bg {
          background: linear-gradient(135deg,#ff9a9e,#fad0c4,#fbc2eb,#a6c1ee);
          background-size: 300% 300%;
          animation: gradientShift 12s ease infinite;
        }
        /* floating aesthetic blobs */
        .bg-blob {
          position: absolute;
          filter: blur(90px);
          opacity: 0.45;
          z-index: -1;
          animation: blobMove 14s ease-in-out infinite;
        }
        .bg-blob.one {
          width: 420px;
          height: 380px;
          background: #ff9a9e;
          top: -120px;
          left: -140px;
        }
        .bg-blob.two {
          width: 360px;
          height: 340px;
          background: #a6c1ee;
          bottom: -160px;
          right: -120px;
        }
        .bg-blob.three {
          width: 300px;
          height: 300px;
          background: #fbc2eb;
          top: 40%;
          left: -100px;
        }

        /* aesthetic upgrades */
        .particles-layer {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 70%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25) 0%, transparent 70%);
          mix-blend-mode: overlay;
          pointer-events: none;
          animation: particleFloat 14s ease-in-out infinite;
        }
        @keyframes particleFloat {
          0% { transform: translateY(0) }
          50% { transform: translateY(-18px) }
          100% { transform: translateY(0) }
        }

        .grain-layer {
          position:absolute;
          inset:0;
          background: url('https://grainy-gradients.vercel.app/noise.svg');
          opacity:0.16;
          mix-blend-mode: soft-light;
          pointer-events:none;
        }

        .wave-layer {
          position:absolute;
          inset:0;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.05),
            rgba(255,255,255,0.2),
            rgba(255,255,255,0.05)
          );
          background-size:200% 100%;
          animation: waveMove 6s ease-in-out infinite;
          pointer-events:none;
        }
        @keyframes waveMove {
          0% { background-position:0% 0 }
          50% { background-position:100% 0 }
          100% { background-position:0% 0 }
        }

        .card {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(10px);
          border-radius:20px;
          padding:28px;
          border: 1px solid rgba(255,255,255,0.4);
          box-shadow: 0 0 22px rgba(255,255,255,0.4),
                      0 0 60px rgba(255,255,255,0.25);
          animation: glowPulse 2.5s ease-in-out infinite alternate;
        }

        @keyframes confettiFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity:1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity:0; }
        }

        @keyframes heartFloat {
          0% { transform: translateY(0) scale(.9); opacity:1; }
          100% { transform: translateY(-420px) scale(1.1); opacity:0; }
        }
        /* fireflies */
        .firefly { position: absolute; border-radius: 50%; box-shadow: 0 6px 24px rgba(255,255,255,0.85); background: rgba(255,255,255,0.95); opacity: 0.95; pointer-events: none; }
        @keyframes fireflyFloat { 0% { transform: translateY(0) scale(0.8); opacity: 0.6 } 50% { transform: translateY(-40px) scale(1.05); opacity: 1 } 100% { transform: translateY(0) scale(0.9); opacity: 0.4 } }
        `}
      </style>

      <audio src="/sad.mp3" loop ref={musicRef} />

      <div
        className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center animated-bg relative overflow-hidden"
        onMouseMove={handleParallax}
        onMouseLeave={resetParallax}
        onTouchMove={handleParallax}
      >

        <button 
          className="absolute top-4 right-4 bg-white bg-opacity-50 px-3 py-2 rounded-lg"
          onClick={() => {
            setMuted(!muted);
            if (musicRef.current) musicRef.current.muted = !muted;
            if (!muted) musicRef.current.play();
          }}
        >
          {muted ? "🔇" : "🔊"}
        </button>

        <div className="bg-blob one"></div>
        <div className="bg-blob two"></div>
        <div className="bg-blob three"></div>
        <div className="particles-layer"></div>
        <div className="grain-layer"></div>
        <div className="wave-layer"></div>
        {/* fireflies layer */}
        {fireflies.map(f => (
          <div
            key={f.id}
            className="firefly"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              animation: `fireflyFloat ${4 + (f.size/8)}s ease-in-out ${f.delay}ms infinite`,
            }}
          />
        ))}

        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              animation: `emojiFall ${5 + (i % 5)}s linear infinite`,
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}vh`,
              fontSize: `${20 + (i % 3) * 8}px`,
            }}
          >
            {emojis[i % emojis.length]}
          </div>
        ))}

        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`b-${i}`}
            className="absolute bg-white bg-opacity-25 rounded-full"
            style={{
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
              left: `${(i * 10) % 100}%`,
              bottom: "-40px",
              animation: `bubbleFloat ${8 + i}s linear infinite`,
            }}
          />
        ))}

        {confetti.map(c => (
          <span 
            key={c.id}
            className="absolute"
            style={{
              top: '-20px',
              left: `${c.left}%`,
              width: '10px',
              height: '16px',
              background: c.color,
              animation: `confettiFall 2.6s linear ${c.delay}ms forwards`,
              borderRadius: '2px'
            }}
          />
        ))}

        {hearts.map(h => (
          <div 
            key={h.id}
            className="absolute"
            style={{
              left: `${h.left}%`,
              bottom: '0px',
              fontSize: `${h.size}px`,
              animation: 'heartFloat 3s linear forwards'
            }}
          >
            💗
          </div>
        ))}

        {sparkles.map(s => (
          <div
            key={s.id}
            className="absolute"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              background: 'white',
              borderRadius: '50%',
              animation: 'particleFloat 2s linear forwards'
            }}
          />
        ))}

        <div className="card max-w-lg w-full animate-[slideLeft_0.6s_ease-out]" ref={cardRef}>

          {step === 0 && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6}} className="space-y-4">
              <h1 className="text-3xl font-bold text-red-700">Hey Sruthi! I'm sorry 🙏</h1>
              <p className="text-gray-700">Please lets talk😭</p>

              <div className="relative h-20" ref={containerRef}>
                <button
                  className="bg-red-500 text-white p-3 rounded-lg text-lg"
                  onClick={() => fakeTyping(1)}
                >
                  Can we talk?
                </button>

                <button
                  ref={nopeRef}
                  className="bg-gray-300 text-black p-3 rounded-lg text-lg absolute"
                  onMouseEnter={() => {
                    teleportNope();
                    showRandomTooltip();
                  }}
                  onClick={() => {
                    teleportNope();
                    showRandomTooltip();
                  }}
                >
                  NOPE
                </button>
                {tooltip.show && (
                  <div
                    className="absolute bg-black text-white text-sm px-2 py-1 rounded"
                    style={{ left: tooltip.x, top: tooltip.y }}
                  >
                    Nice try Kurnool diddy 😭
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{scale:0.9}} animate={{scale:1}} transition={{duration:.5}} className="space-y-4">
              <h2 className="text-2xl font-semibold text-red-600">Please unblock me 😭</h2>
              <p className="text-gray-700"> Click Okay😔😔 </p>
              <div className="relative h-20 flex items-center justify-center">
                <button
                  className="bg-red-500 text-white p-3 rounded-lg mx-2"
                  onClick={() => {
                    burstConfetti();
                    floatHearts();
                    spawnSparkles();
                    fakeTyping(2);
                  }}
                >
                  Okay fine 😒
                </button>

                <button
                  className="bg-gray-300 text-black p-3 rounded-lg mx-2"
                  onMouseEnter={() => {
                    teleportNope();
                    showRandomTooltip();
                  }}
                  onClick={() => {
                    teleportNope();
                    showRandomTooltip();
                  }}
                >
                  NOPE
                </button>

                {tooltip.show && (
                  <div
                    className="absolute bg-black text-white text-sm px-2 py-1 rounded"
                    style={{ left: tooltip.x, top: tooltip.y }}
                  >
                    Nice try Kurnool diddy 😭
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">Thanks🙏 😌</h2>
              <p className="text-gray-700"> 😭</p>
              <button className="bg-red-500 text-white p-3 rounded-lg" onClick={() => setStep(3)}>
                Next →
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.6}} className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600">We're good now 👍</h2>
              <p className="text-gray-700">Let's keep everything chill… no more drama</p>
            </motion.div>
          )}

        </div>
      </div>
      
    </>
  );
}


