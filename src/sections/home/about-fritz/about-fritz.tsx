'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import professional from '@/assets/images/pages/home/about-fritz/profissional.webp';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { HoverLabel } from '@/components/ui/hover-label';
import { FritzIcon } from '@/components/ui/fritz-icon';
import { contact, whatsappUrl } from '@/config/contact';
import { googleReviews } from '@/content/google-reviews';
import { WhatsAppIcon } from '@/components/ui/social-icons';
import './about-fritz.css';

function AboutGoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.92a6 6 0 0 1 0-3.84V7.49H3.07a10 10 0 0 0 0 9.02l3.34-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.93 5.49l3.34 2.59A5.98 5.98 0 0 1 12 5.96Z"
      />
    </svg>
  );
}

const aboutTitle =
  'Por trás de cada cuidado existe alguém que respeita a sua casa.';

export function AboutFritz() {
  const reduced = useReducedMotion();
  const region = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = region.current;
    if (!element || reduced) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          gsap.fromTo(
            '.about-fritz-word',
            { color: '#a2a9b1' },
            {
              color: (_index: number, target: HTMLElement) =>
                getComputedStyle(element)
                  .getPropertyValue(
                    target.dataset.accent === 'true' ? '--brand' : '--ink',
                  )
                  .trim(),
              stagger: 0.12,
              ease: 'none',
              scrollTrigger: {
                trigger: element.querySelector('.about-fritz-heading'),
                start: 'top 85%',
                end: 'bottom 40%',
                scrub: 0.5,
              },
            },
          );
          gsap.fromTo(
            '.about-fritz-photo',
            { y: 0, scale: 0.96 },
            {
              y: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'center 55%',
                scrub: 0.65,
              },
            },
          );
        }, element);
        cleanup = () => context.revert();
      },
    );
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [reduced]);
  return (
    <section
      ref={region}
      id="sobre-a-fritz"
      className="about-fritz section"
      aria-labelledby="about-fritz-title"
      tabIndex={-1}
    >
      <div className="about-fritz-editorial">
        <div className="about-fritz-kicker">
          <SectionEyebrow align="center">Sobre o Fritz</SectionEyebrow>
        </div>
        <div className="about-fritz-heading">
          <h2 id="about-fritz-title" aria-label={aboutTitle}>
            {aboutTitle.split(' ').map((word) => (
              <span
                className="about-fritz-word"
                key={word}
                data-accent={word === 'sua' || word === 'casa.'}
                aria-hidden="true"
              >
                {word}{' '}
              </span>
            ))}
          </h2>
        </div>
        <aside className="about-fritz-note" aria-label="Atendimento Fritz">
          <div className="about-fritz-note-text">
            <h3>Mais de 3 anos de experiência.</h3>
            <p>
              Somos especialistas em higienização de estofados. Nossa missão é
              devolver a vida aos seus móveis.
            </p>
          </div>
          <span className="about-fritz-note-rule" aria-hidden="true" />
          <nav
            className="about-fritz-socials"
            aria-label="Redes e contato do Fritz"
          >
            <span className="about-fritz-note-icon" aria-hidden="true">
              <FritzIcon name="shield-check" />
            </span>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp do Fritz — abrir em nova aba"
              data-track-contact="sobre whatsapp"
            >
              <span className="tw:sr-only">WhatsApp</span>
              <WhatsAppIcon />
            </a>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Fritz — abrir em nova aba"
            >
              <span className="tw:sr-only">Instagram</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            <a
              href={googleReviews.profile}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil do Fritz no Google — abrir em nova aba"
            >
              <span className="tw:sr-only">Google</span>
              <AboutGoogleIcon />
            </a>
          </nav>
        </aside>
        <figure className="about-fritz-portrait">
          <div className="about-fritz-photo">
            <Image
              src={professional}
              alt="Fritz com uniforme, luvas e equipamento de higienização."
              sizes="(max-width: 767px) 85vw, (max-width: 1100px) 45vw, 460px"
            />
          </div>
        </figure>
        <div className="about-fritz-copy">
          <h3>Técnica e cuidado em cada detalhe.</h3>
          <p>
            Aliamos técnicas avançadas, equipamentos de última geração e
            produtos biodegradáveis para cuidar dos seus móveis e da saúde da
            sua família.
          </p>
          <a
            href={whatsappUrl('higienização e proteção dos meus estofados')}
            className="pill-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar com o Fritz pelo WhatsApp — abrir em nova aba"
            data-track-contact="sobre a fritz home"
          >
            <HoverLabel variant="primary">Conversar com o Fritz</HoverLabel>
          </a>
        </div>
      </div>
    </section>
  );
}
