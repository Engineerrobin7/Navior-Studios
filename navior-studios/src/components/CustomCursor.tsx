"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Primary dot
      gsap.to(cursor, {
        x,
        y,
        duration: 0.1,
        ease: "power2.out",
      });

      // Larger follower ring
      gsap.to(follower, {
        x,
        y,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const onMouseDown = () => {
      gsap.to([cursor, follower], { scale: 0.8, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to([cursor, follower], { scale: 1, duration: 0.2 });
    };

    const handleHover = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('button, a, input, [role="button"]');
        
        if (isInteractive) {
            setIsHovered(true);
            gsap.to(follower, {
                scale: 2.5,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                duration: 0.3
            });
            gsap.to(cursor, {
                scale: 0.5,
                opacity: 0.5,
                duration: 0.3
            });
        } else {
            setIsHovered(false);
            gsap.to(follower, {
                scale: 1,
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                duration: 0.3
            });
            gsap.to(cursor, {
                scale: 1,
                opacity: 1,
                duration: 0.3
            });
        }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-9998 -translate-x-1/2 -translate-y-1/2 backdrop-blur-[2px] hidden md:block"
      />
    </>
  );
};

export default CustomCursor;
