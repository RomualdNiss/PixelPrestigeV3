"use client";

import { useEffect, useRef } from "react";
import type { ClientLogo } from "@/types/content";

// Vitesse de défilement automatique (px/s, vers la gauche) et amortissement de
// la vélocité vers cette vitesse après un "lancer".
const AUTO_SPEED = -42;
const FRICTION = 2.4;

function Tiles({ logos }: { logos: ClientLogo[] }) {
  const repeated = Array.from({ length: 3 }).flatMap(() => logos);
  return (
    <>
      {repeated.map((logo, index) => (
        <li key={`${logo.src}-${index}`} className="flex items-center px-4 md:px-5">
          {/* Tuile claire : contraste garanti quels que soient les logos. */}
          <span className="flex h-16 min-w-[132px] items-center justify-center rounded-[3px] border border-black/10 bg-white px-6 shadow-[3px_3px_0_0_rgba(165,41,255,0.35)] md:h-[72px]">
            {/* Export statique : next/image indisponible (images.unoptimized). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt=""
              loading="lazy"
              draggable={false}
              width={120}
              height={36}
              className="h-8 w-auto select-none md:h-9"
            />
          </span>
        </li>
      ))}
    </>
  );
}

// Marquee infini piloté en JS : défile seul, peut être attrapé à la souris/au doigt
// (scrub), "lancé" avec inertie, puis reprend le défilement automatique.
export function LogoMarquee({ logos }: { logos: ClientLogo[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!container || !track || !group) {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const autoSpeed = reduce ? 0 : AUTO_SPEED;

    let offset = 0;
    let velocity = autoSpeed;
    let dragging = false;
    let lastX = 0;
    let lastT = 0;
    let groupWidth = group.offsetWidth;
    let rafId: number | null = null;
    let prev = performance.now();

    const measure = () => {
      groupWidth = group.offsetWidth;
    };

    const wrap = (value: number) => {
      if (groupWidth <= 0) return value;
      let x = value % groupWidth;
      if (x > 0) x -= groupWidth;
      return x;
    };

    const render = () => {
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!dragging) {
        velocity += (autoSpeed - velocity) * Math.min(1, FRICTION * dt);
        offset = wrap(offset + velocity * dt);
        render();
      }
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafId == null) {
        prev = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastT = performance.now();
      velocity = 0;
      container.style.cursor = "grabbing";
      track.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = event.clientX - lastX;
      const dt = (now - lastT) / 1000;
      offset = wrap(offset + dx);
      if (dt > 0) {
        velocity = dx / dt; // px/s, conservé pour l'inertie au relâcher
      }
      lastX = event.clientX;
      lastT = now;
      render();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      container.style.cursor = "grab";
      track.releasePointerCapture?.(event.pointerId);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(container);

    window.addEventListener("resize", measure);
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);

    container.style.cursor = "grab";
    render();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", measure);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="logo-marquee" aria-hidden="true">
      <div ref={trackRef} className="logo-marquee__track" style={{ touchAction: "pan-y" }}>
        <ul ref={groupRef} className="logo-marquee__group">
          <Tiles logos={logos} />
        </ul>
        <ul className="logo-marquee__group">
          <Tiles logos={logos} />
        </ul>
        <ul className="logo-marquee__group">
          <Tiles logos={logos} />
        </ul>
      </div>
    </div>
  );
}
