'use client';
import { FritzIcon } from '@/components/ui/fritz-icon';
import { TitleReveal } from '@/animations/title-reveal';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { useState, useEffect, useRef } from 'react';
import { processSteps } from './process.content';
import './process.css';

const stepIcons = ['photo', 'calendar-check', 'spray', 'shield-check'] as const;

function StepArrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <svg
      className={`process-step-arrow process-step-arrow-${vertical ? 'vertical' : 'horizontal'}`}
      viewBox={vertical ? '0 0 40 120' : '0 0 120 40'}
      preserveAspectRatio={vertical ? 'none' : 'xMidYMid meet'}
      fill="none"
      aria-hidden="true"
    >
      <g transform={vertical ? 'translate(40 0) rotate(90)' : undefined}>
        <circle cx="6" cy="28" r="4" />
        <path d="M12 26C40 5 78 5 109 23" strokeDasharray="4 5" />
        <path d="m101 14 9 10-13 2" />
      </g>
    </svg>
  );
}

export function Process() {
  const list = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const query = window.matchMedia('(width < 768px)');
    const cards = Array.from(
      element.querySelectorAll<HTMLElement>('.process-step'),
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const baseTop = 72;
      const stackGap = 112;
      const last = cards.at(-1);
      const exit =
        query.matches && last
          ? Math.min(
              0,
              element.getBoundingClientRect().bottom -
                (baseTop + (cards.length - 1) * stackGap + last.offsetHeight),
            )
          : 0;
      // Read every card before writing transforms to avoid forced layouts
      // between cards during mobile scrolling.
      const geometry = cards.map((card) => ({
        top:
          card.getBoundingClientRect().top -
          Number(card.style.getPropertyValue('--stack-shift') || 0),
        height: card.offsetHeight,
      }));
      const shifts = geometry.map(({ top }, index) =>
        query.matches
          ? Math.max(0, baseTop + index * stackGap + exit - top)
          : 0,
      );
      const positions = geometry.map(({ top, height }, index) => ({
        top: top + shifts[index],
        bottom: top + shifts[index] + height,
      }));
      cards.forEach((card, index) => {
        const nextTop = positions[index + 1]?.top ?? Infinity;
        const remaining = nextTop - (positions[index].bottom - 36);
        const opacity = query.matches
          ? Math.min(1, Math.max(0, remaining / 36))
          : 1;
        card.style.setProperty('--stack-shift', String(shifts[index]));
        card.style.setProperty('--step-copy-opacity', String(opacity));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    query.addEventListener('change', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      query.removeEventListener('change', schedule);
      cards.forEach((card) => {
        delete card.dataset.covered;
        card.style.removeProperty('--stack-shift');
        card.style.removeProperty('--step-copy-opacity');
      });
    };
  }, []);
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(
    () => new Set(processSteps.map((step) => step.id)),
  );
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(max-width:991px)');
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  function toggle(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  return (
    <section
      id="processo"
      className="process-steps section"
      aria-labelledby="process-title"
      tabIndex={-1}
    >
      <div className="process-steps-heading">
        <SectionEyebrow align="center" className="process-steps-eyebrow">
          Como funciona
        </SectionEyebrow>
        <TitleReveal
          id="process-title"
          text="Do orçamento ao cuidado final"
          accent="cuidado final"
        />
        <p className="process-steps-intro" data-text-anim="">
          Saiba como solicitar higienização ou impermeabilização de estofados
          com o Fritz.
        </p>
      </div>
      <ol ref={list} className="process-steps-list tw:grid">
        {processSteps.map((step, index) => {
          const open = compact || expanded.has(step.id);
          return (
            <li key={step.id} className="process-step" data-open={open}>
              <div
                className="process-step-icon tw:flex tw:items-center tw:justify-center"
                aria-hidden="true"
              >
                <FritzIcon name={stepIcons[index]} />
              </div>
              {index < processSteps.length - 1 && (
                <>
                  <StepArrow />
                  <StepArrow vertical />
                </>
              )}
              <div className="process-step-copy">
                <div className="process-step-label tw:flex tw:items-center tw:justify-center">
                  <span>Etapa {String(index + 1).padStart(2, '0')}</span>
                  <button
                    type="button"
                    className="process-step-toggle tw:flex tw:items-center tw:justify-center"
                    aria-expanded={open}
                    aria-controls={`process-${step.id}`}
                    aria-label={`${open ? 'Fechar' : 'Abrir'} etapa ${index + 1}: ${step.title}`}
                    onClick={() => toggle(step.id)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="m5 9 7 7 7-7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </button>
                </div>
                <h3>{step.title}</h3>
                <div
                  id={`process-${step.id}`}
                  className="process-step-description"
                  inert={!open}
                >
                  <p>{step.text}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
