"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let stars = [];
    let meteors = [];
    let W = 0;
    let H = 0;

    const init = () => {
      W = canvas.parentElement.clientWidth;
      H = canvas.parentElement.clientHeight;
      canvas.width = W;
      canvas.height = H;
      stars = [];
      const count = Math.floor((W * H) / 2500);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.2 + 0.3,
          base: Math.random() * 0.5 + 0.4,
          twinkleSpeed: Math.random() * 0.008 + 0.004,
          phase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
        });
      }
    };

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * W * 1.2,
        y: -20,
        len: Math.random() * 120 + 80,
        speed: Math.random() * 6 + 5,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.4,
        width: Math.random() * 1.5 + 0.5,
        life: 1,
      });
    };

    const meteorInterval = setInterval(() => {
      if (Math.random() < 0.6) spawnMeteor();
    }, 800);

    init();
    window.addEventListener("resize", init);

    const draw = (ts) => {
      ctx.clearRect(0, 0, W, H);

      // 1. Black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);

      // 2. Nebula haze
      const nebula = ctx.createRadialGradient(W * 0.5, 0, 0, W * 0.5, 0, W * 0.85);
      nebula.addColorStop(0.0, "rgba(20, 8, 40, 0.6)");
      nebula.addColorStop(0.5, "rgba(10, 4, 25, 0.25)");
      nebula.addColorStop(1.0, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, W, H);

      // 3. Stars — twinkle + move
      for (let s of stars) {
        // move
        s.x += s.vx;
        s.y += s.vy;

        // wrap around edges
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        // twinkle
        const a = s.base + Math.sin(ts * s.twinkleSpeed + s.phase) * 0.6;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, a));
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // 4. Meteors
      meteors = meteors.filter(m => m.life > 0);
      for (let m of meteors) {
        const dx = Math.cos(m.angle) * m.len;
        const dy = Math.sin(m.angle) * m.len;

        const grad = ctx.createLinearGradient(m.x, m.y, m.x - dx, m.y - dy);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha * m.life})`);
        grad.addColorStop(0.3, `rgba(200, 220, 255, ${m.alpha * m.life * 0.5})`);
        grad.addColorStop(1, "rgba(200, 220, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - dx, m.y - dy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.stroke();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;

        if (m.x > W + 50 || m.y > H + 50) {
          m.life = 0;
        } else if (m.y > H * 0.7) {
          m.life -= 0.05;
        }
      }

      // 5. Red planet top-miidle
      const pr = Math.min(W, H) * 0.45;
      const px = W * 0.5;
      const py = -pr * 0.4;

      const pf = ctx.createRadialGradient(px - pr * 0.2, py + pr * 0.2, pr * 0.05, px, py, pr);
      pf.addColorStop(0.00, "#7a1a0a");
      pf.addColorStop(0.40, "#4a0d06");
      pf.addColorStop(1.00, "#0a0101");
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fillStyle = pf;
      ctx.fill();

      const rim = ctx.createRadialGradient(px - pr * 0.7, py + pr * 0.45, pr * 0.3, px, py, pr);
      rim.addColorStop(0.82, "rgba(220, 60, 20, 0.00)");
      rim.addColorStop(0.92, "rgba(255, 100, 30, 0.85)");
      rim.addColorStop(0.97, "rgba(255, 150, 50, 0.60)");
      rim.addColorStop(1.00, "rgba(255, 180, 80, 0.00)");
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fillStyle = rim;
      ctx.fill();

      const hr = pr * 1.6;
      const halo = ctx.createRadialGradient(px, py, pr * 0.88, px, py, hr);
      halo.addColorStop(0.00, "rgba(200, 40, 10, 0.30)");
      halo.addColorStop(0.50, "rgba(150, 20, 5, 0.10)");
      halo.addColorStop(1.00, "rgba(80, 10, 3, 0.00)");
      ctx.beginPath();
      ctx.arc(px, py, hr, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // 6. Bottom fade
      const fade = ctx.createLinearGradient(0, H * 0.6, 0, H);
      fade.addColorStop(0.0, "rgba(0,0,0,0)");
      fade.addColorStop(1.0, "rgba(0,0,0,0.8)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(meteorInterval);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}