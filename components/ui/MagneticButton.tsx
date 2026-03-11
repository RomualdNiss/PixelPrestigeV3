"use client";

import Link, { type LinkProps } from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = LinkProps & {
  className?: string;
  children: ReactNode;
};

export function MagneticButton({ href, className, children, ...props }: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) {
      return;
    }

    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <motion.span whileTap={{ scale: 0.97 }}>
      <Link
        {...props}
        href={href}
        ref={ref}
        className={cn("transition-transform duration-150", className)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </Link>
    </motion.span>
  );
}

