'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import professional from '@/assets/images/higilimp/profissional-em-atendimento.webp';
import { Contact } from './preview';
import './business-highlights.css';

const whatsapp =
  'https://wa.me/5547992509755?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20a%20higieniza%C3%A7%C3%A3o%20de%20estofados%20da%20minha%20empresa.';
function CleanSpark() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="10"
      height="10"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 1.5 12.2 7.8 18.5 10 12.2 12.2 10 18.5 7.8 12.2 1.5 10 7.8 7.8Z" />
    </svg>
  );
}
function ProcessIcon({ step }: { step: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {step === 1 ? (
        <>
          <circle cx="10.5" cy="10.5" r="5.5" />
          <path d="m15 15 5 5" />
        </>
      ) : step === 2 ? (
        <>
          <path d="M12 3S6 10 6 14a6 6 0 0 0 12 0c0-4-6-11-6-11Z" />
          <path d="M9 14a3 3 0 0 0 3 3" />
        </>
      ) : (
        <path d="m11 16 7-12M4 16h11l3 5H2l2-5ZM16 7l4 2" />
      )}
    </svg>
  );
}
function Marker() {
  return (
    <span className="higi-business-marker" aria-hidden="true">
      <b />
      <b />
    </span>
  );
}
function TextCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="higi-business-card">
      <header>
        <h3>{title}</h3>
        <Marker />
      </header>
      <div className="higi-business-card-copy">
        <p>{description}</p>
        <Contact
          label="Consultar atendimento"
          href={whatsapp}
          ariaLabel={`Consultar ${title.toLowerCase()} pelo WhatsApp — nova aba`}
        />
      </div>
      <span className="higi-business-reveal" aria-hidden="true" />
    </article>
  );
}
export function HigilimpBusinessHighlights() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    let cancelled = false;
    const media = gsap.matchMedia();
    document.fonts.ready.then(() => {
      if (cancelled || !root.current) return;
      media.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 601px)',
        },
        (context) => {
          if (!context.conditions?.motion) return;
          const element = root.current;
          if (!element) return;
          const title = element.querySelector<HTMLElement>(
            '.higi-business-title',
          );
          if (!title) return;
          const split = SplitText.create(title, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit(self) {
              return gsap.fromTo(
                self.lines,
                { y: 30, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  stagger: 0.12,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    once: true,
                  },
                },
              );
            },
          });
          const eyebrow = element.querySelector('.higi-business-eyebrow');
          if (eyebrow)
            gsap.from(eyebrow, {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.out',
              clearProps: 'opacity,transform',
              scrollTrigger: { trigger: eyebrow, start: 'top 90%', once: true },
            });
          const bottom = element.querySelector('.higi-business-intro-bottom');
          if (bottom)
            gsap.from(bottom.children, {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power2.out',
              clearProps: 'opacity,transform',
              scrollTrigger: { trigger: bottom, start: 'top 90%', once: true },
            });
          const cards = [
            ...element.querySelectorAll<HTMLElement>('.higi-business-card'),
          ];
          cards.forEach((card, index) => {
            const curtain = card.querySelector('.higi-business-reveal');
            if (!curtain) return;
            const timeline = gsap.timeline({
              delay: context.conditions?.desktop ? index * 0.16 : 0,
              scrollTrigger: { trigger: card, start: 'top 85%', once: true },
            });
            timeline.fromTo(
              curtain,
              { display: 'block', height: '100%' },
              {
                height: '0%',
                duration: 1.4,
                ease: 'power3.inOut',
                clearProps: 'all',
              },
              0,
            );
            const photo = card.querySelector('img');
            if (photo)
              timeline.fromTo(
                photo,
                { scale: 1.5, transition: 'none' },
                {
                  scale: 1,
                  duration: 1.6,
                  ease: 'power2.out',
                  clearProps: 'transform,transition',
                },
                0,
              );
          });
          return () => split.revert();
        },
        root,
      );
    });
    return () => {
      cancelled = true;
      media.revert();
    };
  }, []);
  return (
    <section
      ref={root}
      id="higienizacao-empresarial"
      className="higi-business"
      aria-labelledby="higi-business-title"
    >
      <div className="higi-business-inner">
        <div className="higi-business-intro">
          <p className="higi-business-eyebrow">
            <span className="higi-business-ornament" aria-hidden="true">
              <span className="higi-business-ornament-line" />
              <CleanSpark />
            </span>
            <span>Higienização empresarial</span>
            <span className="higi-business-ornament" aria-hidden="true">
              <CleanSpark />
              <span className="higi-business-ornament-line" />
            </span>
          </p>
          <h2 id="higi-business-title" className="higi-business-title">
            Da recepção ao escritório, cuidamos dos estofados da sua empresa com
            técnica, atenção aos materiais e um atendimento planejado para a sua
            rotina.
          </h2>
          <div className="higi-business-intro-bottom">
            <p>
              Tapetes, carpetes, cadeiras e estofados em Joinville e região.
            </p>
            <Contact />
          </div>
        </div>
        <div className="higi-business-grid">
          <article className="higi-business-card higi-business-process">
            <header>
              <h3>
                Técnica em
                <br />
                cada etapa.
              </h3>
              <Marker />
            </header>
            <ol className="higi-business-steps">
              {[
                { title: 'Avaliação', detail: 'Identificação do tecido' },
                { title: 'Aplicação', detail: 'Produto adequado' },
                { title: 'Extração', detail: 'Limpeza das fibras' },
              ].map((step, index) => (
                <li key={step.title}>
                  <span className="higi-business-step-icon">
                    <ProcessIcon step={index + 1} />
                  </span>
                  <div className="higi-business-step-copy">
                    <span>
                      <small>{String(index + 1).padStart(2, '0')}</small>
                      <strong>{step.title}</strong>
                    </span>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <span className="higi-business-reveal" aria-hidden="true" />
          </article>
          <TextCard
            title="Limpeza profunda."
            description="Remoção de resíduos e sujeiras acumuladas nas fibras de tapetes, carpetes e estofados."
          />
          <figure className="higi-business-card higi-business-photo">
            <Image
              src={professional}
              alt="Proprietário da Higilimp em atendimento, com equipamento de higienização ao fundo"
              fill
              sizes="(max-width: 600px) 90vw, (max-width: 1200px) 45vw, 25vw"
            />
            <span className="higi-business-reveal" aria-hidden="true" />
          </figure>
          <TextCard
            title="Sua empresa bem cuidada."
            description="Ambientes mais limpos e apresentáveis para receber clientes, colaboradores e visitantes."
          />
        </div>
      </div>
    </section>
  );
}
