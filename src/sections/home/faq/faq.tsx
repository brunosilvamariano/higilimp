'use client';

import { useState, useSyncExternalStore } from 'react';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { faqItems } from './faq.content';
import './faq.css';

const mobileQuery = '(max-width: 767px)';
const subscribe = (notify: () => void) => {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};
const getMobile = () => window.matchMedia(mobileQuery).matches;
const getServerMobile = () => false;

export function Faq() {
  const mobile = useSyncExternalStore(subscribe, getMobile, getServerMobile);
  const [openIds, setOpenIds] = useState(
    () => new Set<string>([faqItems[0].id]),
  );
  const columns = mobile
    ? [faqItems]
    : [
        faqItems.filter((_, index) => index % 2 === 0),
        faqItems.filter((_, index) => index % 2 === 1),
      ];

  return (
    <section
      className="faq section"
      id="duvidas"
      aria-labelledby="faq-title"
      tabIndex={-1}
    >
      <div className="faq-introduction">
        <SectionEyebrow align="center">Perguntas frequentes</SectionEyebrow>
        <h2 id="faq-title">
          Dúvidas antes de <span>agendar?</span>
        </h2>
        <p>
          Do orçamento aos cuidados após o atendimento, veja o que você precisa
          saber.
        </p>
      </div>
      <div className="faq-list tw:min-w-0">
        {columns.map((items, column) => (
          <div className="faq-column" key={column === 0 ? 'first' : 'second'}>
            {items.map((item) => {
              const index = faqItems.findIndex((entry) => entry.id === item.id);
              const expanded = openIds.has(item.id);
              return (
                <div className="faq-item" key={item.id} data-open={expanded}>
                  <h3>
                    <button
                      className="faq-trigger tw:grid tw:items-center tw:w-full tw:text-left"
                      type="button"
                      id={`faq-trigger-${item.id}`}
                      aria-expanded={expanded}
                      aria-controls={`faq-answer-${item.id}`}
                      onClick={() =>
                        setOpenIds((current) => {
                          const next = new Set(current);
                          if (next.has(item.id)) next.delete(item.id);
                          else next.add(item.id);
                          return next;
                        })
                      }
                      onKeyDown={(event) => {
                        const nextIndex =
                          event.key === 'ArrowDown'
                            ? (index + 1) % faqItems.length
                            : event.key === 'ArrowUp'
                              ? (index - 1 + faqItems.length) % faqItems.length
                              : event.key === 'Home'
                                ? 0
                                : event.key === 'End'
                                  ? faqItems.length - 1
                                  : null;
                        if (nextIndex !== null) {
                          event.preventDefault();
                          document
                            .getElementById(
                              `faq-trigger-${faqItems[nextIndex].id}`,
                            )
                            ?.focus();
                        }
                      }}
                    >
                      <span className="faq-index" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{item.question}</span>
                      <span className="faq-mark tw:relative" aria-hidden="true">
                        <i />
                        <i />
                      </span>
                    </button>
                  </h3>
                  <div
                    className="faq-answer tw:grid"
                    id={`faq-answer-${item.id}`}
                    aria-hidden={!expanded}
                    inert={!expanded}
                  >
                    <div className="faq-answer-clip tw:overflow-hidden">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
