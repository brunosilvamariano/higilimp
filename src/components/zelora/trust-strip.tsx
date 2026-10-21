'use client';

import { gsap } from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';
import './trust-strip.css';

const features = [
  {
    title: 'Cuidado com o tecido',
    description: 'Avaliação antes da higienização',
  },
  {
    title: 'Secagem orientada',
    description: 'Orientação antes de voltar a usar',
  },
  {
    title: 'Atendimento planejado',
    description: 'Empresas e residências',
  },
];
export function ZeloraTrustStrip() {
  const root = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', (context) => {
      const parts = gsap.utils.toArray<HTMLElement>(
        '[data-trust-reveal]',
        section,
      );
      gsap.set(parts, { opacity: 0, y: 100 });
      let revealed = false;
      const observer = new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting);
          if (!entry.isIntersecting || revealed) return;
          revealed = true;
          context.add(() => {
            parts.forEach((part) => {
              gsap.to(part, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: Number(part.dataset.trustReveal),
                ease: 'none',
                clearProps: 'opacity,transform',
              });
            });
          });
        },
        { threshold: 0 },
      );
      observer.observe(section);
      return () => observer.disconnect();
    });
    return () => media.revert();
  }, []);

  return (
    <section
      ref={root}
      className="zelora-trust-strip"
      aria-labelledby="zelora-trust-title"
      data-in-view={inView}
    >
      <div className="zelora-trust-inner">
        <div className="zelora-trust-proof">
          <h2 id="zelora-trust-title" data-trust-reveal="0.3">
            Cuidado em cada detalhe.
          </h2>
          <p>Higienização de estofados em Joinville e região.</p>
        </div>
        <div className="zelora-trust-separator" data-trust-reveal="0.4" />
        <div className="zelora-trust-marquee-wrap" data-trust-reveal="0.5">
          <div className="zelora-trust-marquee" id="zelora-trust-marquee">
            {[false, true].map((duplicate) => (
              <ul
                className="zelora-trust-features"
                key={String(duplicate)}
                aria-hidden={duplicate || undefined}
              >
                {features.map((feature) => (
                  <li key={feature.title}>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
