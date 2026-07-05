import { useEffect, useRef } from "react";

/* ─── Interactive Web-Net + Aurora Background ───────────────────────────────
   Features:
   - Particle network: dots connected by lines, reacts to mouse cursor
   - Particles repel gently from cursor (web-opens-under-cursor effect)
   - Lines from cursor to nearby particles (cyan coloured)
   - Aurora glow blobs in background layer
   - Theme-aware colours (reads .dark class from <html>)
────────────────────────────────────────────────────────────────────────────── */
export const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    /* --- Configuration ---------------------------------------------------- */
    const isMobile    = W < 768;
    const COUNT       = isMobile ? 55 : 110;
    const MAX_DIST    = isMobile ? 120 : 150;
    const CURSOR_DIST = isMobile ? 150 : 200;
    const REPEL_DIST  = 90;
    const SPEED       = 0.45;

    /* --- Mouse ------------------------------------------------------------ */
    const mouse = { x: -9999, y: -9999 };

    /* --- Dark-mode helper ------------------------------------------------- */
    let isDark = document.documentElement.classList.contains("dark");
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    /* --- Particles -------------------------------------------------------- */
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 1.6 + 0.8,
    }));

    /* --- Draw ------------------------------------------------------------- */
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* Colour theme */
      const dotAlpha  = isDark ? 0.75 : 0.65;
      const lineAlpha = isDark ? 0.30 : 0.26;
      const cyanAlpha = isDark ? 0.55 : 0.55;

      /* Update + draw particles */
      for (const p of particles) {
        /* Move */
        p.x += p.vx;
        p.y += p.vy;

        /* Bounce edges */
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        /* Repel from cursor */
        const mx = p.x - mouse.x;
        const my = p.y - mouse.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < REPEL_DIST && md > 0) {
          const force = ((REPEL_DIST - md) / REPEL_DIST) * 0.6;
          p.x += (mx / md) * force;
          p.y += (my / md) * force;
        }

        /* Draw dot */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,99,255,${dotAlpha})`;
        ctx.fill();
      }

      /* Draw particle-to-particle lines */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const a = lineAlpha * (1 - dist / MAX_DIST);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108,99,255,${a})`;
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }

        /* Draw line from each particle to cursor */
        const cx   = particles[i].x - mouse.x;
        const cy   = particles[i].y - mouse.y;
        const cd   = Math.sqrt(cx * cx + cy * cy);
        if (cd < CURSOR_DIST) {
          const a = cyanAlpha * (1 - cd / CURSOR_DIST);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0,212,255,${a})`;
          ctx.lineWidth   = 0.9;
          ctx.stroke();
        }
      }

      /* Cursor glow dot */
      if (mouse.x > 0 && mouse.x < W) {
        const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 18);
        grd.addColorStop(0, isDark ? "rgba(0,212,255,0.55)" : "rgba(0,212,255,0.4)");
        grd.addColorStop(1, "rgba(0,212,255,0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    /* --- Event listeners -------------------------------------------------- */
    const onMove    = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave   = ()  => { mouse.x = -9999; mouse.y = -9999; };
    const onTouch   = (e) => {
      if (e.touches.length) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }
    };
    const onResize  = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove",  onTouch, { passive: true });
    window.addEventListener("touchend",   onLeave);
    window.addEventListener("resize",     onResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove",  onTouch);
      window.removeEventListener("touchend",   onLeave);
      window.removeEventListener("resize",     onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      {/* ── Web-net canvas (interactive) ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* ── Aurora blobs — extra blob for light-mode richness ── */}
      <div
        className="absolute animate-aurora"
        style={{
          top: "8%", left: "12%",
          width: 700, height: 700,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(108,99,255,0.25) 0%, rgba(108,99,255,0.07) 55%, transparent 75%)",
          filter: "blur(70px)",
          opacity: "var(--c-aurora-opacity)",
        }}
      />
      <div
        className="absolute animate-aurora-delay-1"
        style={{
          top: "50%", right: "8%",
          width: 560, height: 560,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,212,255,0.22) 0%, rgba(0,212,255,0.06) 55%, transparent 75%)",
          filter: "blur(80px)",
          opacity: "var(--c-aurora-opacity)",
        }}
      />
      <div
        className="absolute animate-aurora-delay-2"
        style={{
          bottom: "6%", left: "38%",
          width: 520, height: 520,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(168,85,247,0.22) 0%, rgba(168,85,247,0.06) 55%, transparent 75%)",
          filter: "blur(80px)",
          opacity: "var(--c-aurora-opacity)",
        }}
      />
      {/* Extra blob — top-right, visible mainly in light mode */}
      <div
        className="absolute animate-aurora"
        style={{
          top: "30%", right: "20%",
          width: 380, height: 380,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,212,255,0.18) 0%, rgba(108,99,255,0.08) 55%, transparent 75%)",
          filter: "blur(60px)",
          opacity: "var(--c-aurora-opacity)",
          animationDelay: "9s",
        }}
      />

      {/* ── Floating 3-D ring (top-right) ── */}
      <div
        className="absolute animate-spin-slow"
        style={{
          top: "7%", right: "7%",
          width: 200, height: 200,
          borderRadius: "50%",
          border: "1.5px solid rgba(108,99,255,0.22)",
          boxShadow: "0 0 28px rgba(108,99,255,0.08)",
        }}
      />
      <div
        className="absolute animate-spin-slow-reverse"
        style={{
          top: "calc(7% + 28px)", right: "calc(7% + 28px)",
          width: 144, height: 144,
          borderRadius: "50%",
          border: "1px solid rgba(0,212,255,0.18)",
          boxShadow: "0 0 18px rgba(0,212,255,0.06)",
        }}
      />

      {/* ── Floating diamond (bottom-left) ── */}
      <div
        className="absolute animate-float-3d"
        style={{
          bottom: "18%", left: "5%",
          width: 72, height: 72,
          background: "linear-gradient(135deg, rgba(108,99,255,0.28), rgba(0,212,255,0.18))",
          transform: "rotate(45deg)",
          borderRadius: "10px",
          boxShadow: "0 0 28px rgba(108,99,255,0.18)",
          opacity: 0.8,
        }}
      />

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--c-grid-line) 1px, transparent 1px)," +
            "linear-gradient(90deg, var(--c-grid-line) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
};