'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { googleReviews } from '@/content/google-reviews';
import { HoverLabel } from '@/components/ui/hover-label';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { TitleReveal } from '@/animations/title-reveal';
import './testimonials.css';

function GoogleWord() {
  return (
    <span className="review-google-word">
      <span style={{ color: '#4285F4' }}>G</span>
      <span style={{ color: '#EA4335' }}>o</span>
      <span style={{ color: '#FBBC05' }}>o</span>
      <span style={{ color: '#4285F4' }}>g</span>
      <span style={{ color: '#34A853' }}>l</span>
      <span style={{ color: '#EA4335' }}>e</span>
    </span>
  );
}

function GoogleCtaMark() {
  return (
    <svg
      className="review-google-cta-mark"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
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

function QuoteMark() {
  return (
    <svg
      className="review-quote-mark"
      viewBox="0 0 48 40"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 6h16v14c0 9-5 14-13 16v-6c5-2 7-5 7-10H4V6Zm24 0h16v14c0 9-5 14-13 16v-6c5-2 7-5 7-10H28V6Z" />
    </svg>
  );
}
type Review = (typeof googleReviews.items)[number];

function ReviewCard({
  item,
  linked = false,
}: {
  item: Review;
  linked?: boolean;
}) {
  return (
    <article className="review-wall-card">
      <div className="review-wall-card-top tw:flex tw:items-center tw:justify-between">
        <span
          className="review-wall-stars"
          role="img"
          aria-label="5 de 5 estrelas"
        >
          ★★★★★
        </span>
        <GoogleCtaMark />
      </div>
      <blockquote>“{item.text}”</blockquote>
      <div className="review-wall-author tw:flex tw:items-center">
        <Image src={item.image} alt="" width={44} height={44} unoptimized />
        <div>
          <h3>{item.name}</h3>
          <p>
            {item.excerpt ? 'Trecho de avaliação no ' : 'Avaliação no '}
            <GoogleWord />
          </p>
        </div>
      </div>
      <QuoteMark />
      {linked && (
        <a
          className="review-wall-source"
          href={item.profile}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver avaliação de ${item.name} no Google — abrir em nova aba`}
        >
          Ler no <GoogleWord /> ↗
        </a>
      )}
    </article>
  );
}

function subscribeColumns(update: () => void) {
  const queries = [
    window.matchMedia('(min-width: 1400px)'),
    window.matchMedia('(min-width: 1000px)'),
    window.matchMedia('(min-width: 768px)'),
  ];
  for (const query of queries) query.addEventListener('change', update);
  return () => {
    for (const query of queries) query.removeEventListener('change', update);
  };
}

function getColumnCount() {
  return window.matchMedia('(min-width: 1400px)').matches
    ? 4
    : window.matchMedia('(min-width: 1000px)').matches
      ? 3
      : window.matchMedia('(min-width: 768px)').matches
        ? 2
        : 1;
}

export function Testimonials() {
  const [paused, setPaused] = useState(false);
  const [running, setRunning] = useState(false);
  const section = useRef<HTMLElement>(null);
  const columnCount = useSyncExternalStore(
    subscribeColumns,
    getColumnCount,
    () => 4,
  );
  const reviewColumns = Array.from({ length: columnCount }, (_, offset) =>
    googleReviews.items.filter((_, index) => index % columnCount === offset),
  );

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    let inView = false;
    const update = () => setRunning(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  useEffect(() => {
    const wall = section.current?.querySelector<HTMLElement>('.review-wall');
    if (!wall) return;
    const tracks = wall.querySelectorAll<HTMLElement>('.review-wall-track');
    if (tracks.length !== columnCount) return;
    const rates = [18, 16, 19, 17];
    const updateSpeed = () => {
      if (!wall.clientHeight) return;
      tracks.forEach((track, index) => {
        const distance = Math.max(0, track.offsetHeight - wall.clientHeight);
        track.style.setProperty(
          '--review-speed',
          `${Math.max(1, distance / rates[index])}s`,
        );
      });
    };
    const observer = new ResizeObserver(updateSpeed);
    observer.observe(wall);
    for (const track of tracks) observer.observe(track);
    updateSpeed();
    return () => observer.disconnect();
  }, [columnCount]);

  return (
    <section
      ref={section}
      className="testimonials review-testimonials"
      id="avaliacoes"
      aria-labelledby="testimonials-title"
      data-running={running}
    >
      <div className="review-wall-heading">
        <div>
          <SectionEyebrow>Avaliações de clientes</SectionEyebrow>
          <TitleReveal
            id="testimonials-title"
            text="Quem recebeu esse cuidado conta."
            accent="conta."
          />
        </div>
        <button
          className="review-wall-pause tw:flex tw:items-center"
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {paused ? (
              <path d="m9 5 10 7-10 7V5Z" fill="currentColor" />
            ) : (
              <path
                d="M8 5v14M16 5v14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
          {paused ? 'Retomar movimento' : 'Pausar para ler'}
        </button>
      </div>
      <div
        className="review-wall-wrap"
        data-paused={paused}
        data-columns={columnCount}
      >
        <div className="review-wall" aria-hidden="true" inert>
          {reviewColumns.map((items) => (
            <div className="review-wall-column" key={items[0].name}>
              <div className="review-wall-track">
                <div className="review-wall-group">
                  {items.map((item) => (
                    <ReviewCard key={item.name} item={item} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ul
          className="review-reading-list"
          aria-label="Avaliações de clientes do Fritz"
        >
          {googleReviews.items.map((item) => (
            <li key={item.name}>
              <ReviewCard item={item} linked />
            </li>
          ))}
        </ul>
      </div>
      <div className="review-wall-actions">
        <p>
          {googleReviews.rating} de 5 · {googleReviews.count} avaliações no{' '}
          <GoogleWord />.
        </p>
        <a
          className="pill-link review-google-cta"
          href={googleReviews.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Deixar uma avaliação no Google — abrir em nova aba"
        >
          <GoogleCtaMark />
          <HoverLabel variant="primary">Deixar uma avaliação</HoverLabel>
        </a>
      </div>
    </section>
  );
}
