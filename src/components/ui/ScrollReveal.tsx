'use client';

import { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  delay?: number;
  className?: string;
}

const ScrollReveal = ({
  children,
  threshold = 0.1,
  delay = 0,
  className = '',
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay]);

  return (
    <div ref={ref} className={`animate-on-scroll ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal; 