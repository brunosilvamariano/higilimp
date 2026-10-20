'use client';

import Image from 'next/image';
import { gsap } from 'gsap';
import { useLayoutEffect, useRef, useState } from 'react';
import josiane from '@/assets/images/higilimp/google-reviews/josiane-nascimento.webp';
import raphaela from '@/assets/images/higilimp/google-reviews/raphaela-del-carmen.webp';
import adriana from '@/assets/images/higilimp/google-reviews/adriana-bl.webp';
import richard from '@/assets/images/higilimp/google-reviews/richard-miranda-mainhardt.webp';
import './trust-strip.css';

const googleProfile =
  'https://www.google.com/search?q=higilimp#lrd=0x94d945738925f9b9:0x88c752e48d51e918,1,,,,';
const reviewers = [
  {
    name: 'Josiane Nascimento',
    image: josiane,
    profile:
      'https://www.google.com/maps/contrib/106143698215054195015/reviews?hl=pt-BR',
  },
  {
    name: 'Raphaela Del Carmen',
    image: raphaela,
    profile:
      'https://www.google.com/maps/contrib/110176522033329524081/reviews?hl=pt-BR',
  },
  {
    name: 'Adriana BL',
    image: adriana,
    profile:
      'https://www.google.com/maps/contrib/107590876587665046156/reviews?hl=pt-BR',
  },
  {
    name: 'Richard Miranda Mainhardt',
    image: richard,
    profile:
      'https://www.google.com/maps/contrib/111752746277251115786/reviews?hl=pt-BR',
  },
];
const features = [
  {
    title: 'Processo técnico',
    description: 'Produto específico para cada material',
  },
  {
    title: 'Secagem rápida',
    description: 'Ambiente utilizável em poucas horas',
  },
  {
    title: 'Atendimento ágil',
    description: 'Empresas e residências',
  },
];
export function HigilimpTrustStrip() {
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
      className="higi-trust-strip"
      aria-labelledby="higi-trust-title"
      data-in-view={inView}
    >
      <div className="higi-trust-inner">
        <div className="higi-trust-proof">
          <h2 id="higi-trust-title" data-trust-reveal="0.3">
            Cuidado que inspira confiança.
          </h2>
          <div className="higi-trust-social" data-trust-reveal="0.4">
            <div className="higi-trust-avatars">
              {reviewers.map((person) => (
                <a
                  key={person.name}
                  href={person.profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver avaliações de ${person.name} no Google — nova aba`}
                  title={person.name}
                >
                  <Image
                    src={person.image}
                    alt=""
                    width={40}
                    height={40}
                    sizes="40px"
                  />
                </a>
              ))}
            </div>
            <a
              className="higi-trust-rating"
              href={googleProfile}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Higilimp: nota 5 de 5 em 227 avaliações no Google — nova aba"
            >
              <span>
                <strong>5,0</strong>
                <span className="higi-trust-stars" aria-hidden="true">
                  ★★★★★
                </span>
              </span>
              <small>
                227 avaliações no{' '}
                <span className="higi-trust-google" aria-hidden="true">
                  <span>G</span>
                  <span>o</span>
                  <span>o</span>
                  <span>g</span>
                  <span>l</span>
                  <span>e</span>
                </span>
              </small>
            </a>
          </div>
        </div>
        <div className="higi-trust-separator" data-trust-reveal="0.4" />
        <div className="higi-trust-marquee-wrap" data-trust-reveal="0.5">
          <div className="higi-trust-marquee" id="higi-trust-marquee">
            {[false, true].map((duplicate) => (
              <ul
                className="higi-trust-features"
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
