import Image from 'next/image';
import { WhatsAppIcon } from '@/components/ui/social-icons';
import { HoverLabel } from '@/components/ui/hover-label';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { TitleReveal } from '@/animations/title-reveal';
import { whatsappUrl } from '@/config/contact';
import { comparisonCases } from './before-after.content';
import './before-after.css';

export function BeforeAfter() {
  return (
    <section
      id="antes-e-depois"
      className="before-after"
      aria-labelledby="comparison-title"
      tabIndex={-1}
    >
      <div className="before-after-heading">
        <div>
          <SectionEyebrow>Antes e depois</SectionEyebrow>
          <TitleReveal
            id="comparison-title"
            text="O cuidado em cada detalhe."
            accent="cada detalhe."
          />
        </div>
        <p>Observe os detalhes de cada superfície.</p>
      </div>
      <div className="comparison-collection">
        {comparisonCases.map((item) => (
          <article
            className="comparison-project"
            key={item.id}
            aria-labelledby={`comparison-${item.id}`}
          >
            <div className="comparison-project-heading">
              <h3 id={`comparison-${item.id}`}>{item.title}</h3>
              <span>Higienização</span>
            </div>
            <div className="comparison-project-photo">
              <Image
                src={item.image}
                alt={
                  'Comparativo ilustrativo de ' +
                  item.title.toLowerCase() +
                  ': antes à esquerda e depois à direita.'
                }
                sizes="(max-width: 767px) 90vw, (min-width: 1600px) 800px, 52vw"
              />
              <div className="comparison-project-labels" aria-hidden="true">
                <span>Antes</span>
                <span>Depois</span>
              </div>
              <div className="comparison-project-action">
                <a
                  className="comparison-project-contact pill-link"
                  href={whatsappUrl(item.title.toLowerCase())}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    'Solicitar orçamento para ' +
                    item.title.toLowerCase() +
                    ' pelo WhatsApp — abrir em nova aba'
                  }
                  data-track-contact={`antes e depois ${item.id}`}
                >
                  <HoverLabel variant="primary">Pedir orçamento</HoverLabel>
                  <WhatsAppIcon />
                </a>
              </div>
            </div>
            <p className="comparison-project-detail">{item.detail}</p>
          </article>
        ))}
      </div>
      <p className="comparison-gallery-note">
        Comparativos ilustrativos de higienização.
      </p>
      <svg
        className="before-after-wave"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="before-after-wave-pattern"
            width="96"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 0H96V16Q72 25 48 16T0 16Z"
              fill="var(--comparison-surface)"
            />
            <path
              d="M0 15Q24 6 48 15T96 15"
              fill="none"
              stroke="#fff"
              strokeWidth="1.2"
            />
            <path
              d="M0 16Q24 7 48 16T96 16"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="32" fill="url(#before-after-wave-pattern)" />
      </svg>
    </section>
  );
}
