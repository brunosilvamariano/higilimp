'use client';

import {
  Fragment,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Contact } from './preview';
import './reasons.css';

const reasons = [
  {
    title: 'Cuidado com cada tecido',
    description:
      'Antes da higienização de sofás, colchões e cadeiras, o material é avaliado para definir os produtos e as técnicas adequados.',
    label: 'Tecido',
    icon: 'fabric',
  },
  {
    title: 'Extração profissional',
    description:
      'Limpeza profunda com extração da sujeira e dos resíduos acumulados nas fibras dos estofados.',
    label: 'Limpeza',
    icon: 'equipment',
  },
  {
    title: 'Atendimento em Joinville',
    description:
      'Higienização para residências e empresas em Joinville e região, com agendamento e execução planejada para a sua rotina.',
    label: 'Atendimento',
    icon: 'spaces',
  },
] as const;

function ReasonIcon({ kind }: { kind: (typeof reasons)[number]['icon'] }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === 'fabric' ? (
        <>
          <rect x="5" y="7" width="22" height="19" rx="3" />
          <path d="M11 7v19M17 7v19M23 7v19M5 13h22M5 20h22M8 4v3M24 4v3" />
        </>
      ) : kind === 'equipment' ? (
        <>
          <rect x="5" y="14" width="14" height="12" rx="3" />
          <path d="M9 14v-3h6v3M8 26v3M16 26v3M19 19h3a4 4 0 0 0 4-4V8M23 8h6M12 18v4" />
        </>
      ) : (
        <path d="m3 16 9-8 9 8M6 14v13h12V14M10 27v-7h4v7M19 5h9v22h-7M23 10h1M23 15h1M23 20h1" />
      )}
    </svg>
  );
}

function NavigationArrow({ previous = false }: { previous?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={previous ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'} />
    </svg>
  );
}

export function ZeloraReasons() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const scrollTrigger = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const updateActive = useCallback((index: number) => {
    if (activeRef.current !== index) {
      activeRef.current = index;
      setActive(index);
    }
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 901px) and (min-height: 680px)',
      },
      (context) => {
        if (
          !context.conditions?.motion ||
          !context.conditions?.desktop ||
          !root.current
        )
          return;
        const stage = root.current.querySelector('.zelora-reasons-stage');
        const cards = root.current.querySelectorAll('.zelora-reason');
        if (!stage) return;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: () =>
              `top ${getComputedStyle(root.current!.querySelector('.zelora-reasons-sticky')!).top}`,
            end: () => {
              const sticky = root.current!.querySelector<HTMLElement>(
                '.zelora-reasons-sticky',
              )!;
              return `bottom ${parseFloat(getComputedStyle(sticky).top) + sticky.offsetHeight}px`;
            },
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
          onUpdate() {
            updateActive(
              Math.min(
                reasons.length - 1,
                Math.floor(this.progress() * reasons.length),
              ),
            );
          },
        });
        timeline.fromTo(
          cards,
          { rotationY: -180, yPercent: 100, opacity: 0 },
          {
            rotationY: 0,
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 1.2,
            ease: 'none',
          },
        );
        scrollTrigger.current = timeline.scrollTrigger ?? null;
        return () => {
          scrollTrigger.current = null;
        };
      },
      root,
    );
    return () => media.revert();
  }, [updateActive]);

  function selectReason(index: number) {
    const next = Math.max(0, Math.min(reasons.length - 1, index));
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches
      ? 'auto'
      : 'smooth';
    const trigger = scrollTrigger.current;
    if (trigger) {
      window.scrollTo({
        top:
          trigger.start +
          (trigger.end - trigger.start) *
            ((next * 1.2 + 1) / (1 + (reasons.length - 1) * 1.2)),
        behavior,
      });
      return;
    }
    const card = track.current?.children[next] as HTMLElement | undefined;
    if (
      track.current &&
      card &&
      window.matchMedia('(max-width: 900px)').matches
    ) {
      track.current.scrollTo({ left: card.offsetLeft, behavior });
    }
    updateActive(next);
  }

  function handleTrackScroll() {
    if (!track.current || window.matchMedia('(min-width: 901px)').matches)
      return;
    const cards = [...track.current.children] as HTMLElement[];
    const left = track.current.scrollLeft;
    const nearest = cards.reduce(
      (best, card, index) =>
        Math.abs(card.offsetLeft - left) <
        Math.abs(cards[best].offsetLeft - left)
          ? index
          : best,
      0,
    );
    updateActive(nearest);
  }

  return (
    <section
      ref={root}
      id="beneficios"
      className="zelora-reasons"
      aria-labelledby="zelora-reasons-title"
    >
      <div className="zelora-reasons-inner">
        <header className="zelora-reasons-heading">
          <h2 id="zelora-reasons-title">Por que escolher a Zelora</h2>
          <p>
            Higienização de estofados em Joinville, com produtos específicos,
            extração profissional e cuidado com a sua casa ou empresa.
          </p>
        </header>
        <div className="zelora-reasons-stage">
          <div className="zelora-reasons-sticky">
            <fieldset
              className="zelora-reasons-progress"
              aria-label="Navegar pelos diferenciais"
            >
              {reasons.map((reason, index) => (
                <Fragment key={reason.icon}>
                  <button
                    type="button"
                    className="zelora-reasons-step"
                    data-active={active === index}
                    data-complete={index <= active}
                    aria-current={active === index ? 'step' : undefined}
                    aria-label={`${index + 1} de ${reasons.length}: ${reason.title}`}
                    onClick={() => selectReason(index)}
                  >
                    <span className="zelora-reasons-step-label">
                      Diferencial
                    </span>{' '}
                    {String(index + 1).padStart(2, '0')}
                  </button>
                  {index < reasons.length - 1 && (
                    <span
                      className="zelora-reasons-connector"
                      aria-hidden="true"
                    />
                  )}
                </Fragment>
              ))}
            </fieldset>
            <ol
              ref={track}
              className="zelora-reasons-grid"
              onScroll={handleTrackScroll}
              aria-label="Diferenciais da Zelora"
            >
              {reasons.map((reason, index) => (
                <li className="zelora-reason" key={reason.icon}>
                  <div className="zelora-reason-top">
                    <span className="zelora-reason-icon">
                      <ReasonIcon kind={reason.icon} />
                    </span>
                    <span className="zelora-reason-number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </li>
              ))}
            </ol>
            <div className="zelora-reasons-mobile-controls">
              <span>
                {String(active + 1).padStart(2, '0')}{' '}
                <span aria-hidden="true">/</span> 03
              </span>
              <div>
                <button
                  type="button"
                  aria-label="Diferencial anterior"
                  disabled={active === 0}
                  onClick={() => selectReason(active - 1)}
                >
                  <NavigationArrow previous />
                </button>
                <button
                  type="button"
                  aria-label="Próximo diferencial"
                  disabled={active === reasons.length - 1}
                  onClick={() => selectReason(active + 1)}
                >
                  <NavigationArrow />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="zelora-reasons-action">
          <Contact ariaLabel="Solicitar orçamento de higienização de estofados em Joinville pelo WhatsApp — nova aba" />
        </div>
      </div>
    </section>
  );
}
