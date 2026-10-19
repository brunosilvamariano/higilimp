'use client';

import { useEffect, useRef } from 'react';

import { TitleReveal } from '@/animations/title-reveal';
import { HoverLabel } from '@/components/ui/hover-label';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { whatsappUrl } from '@/config/contact';
import { FritzIcon } from '@/components/ui/fritz-icon';
import { ServiceVideo } from './service-video';
import { servicesContent } from './services.content';
import { serviceVideoPosters } from './services.videos';
import './services-projects.css';

const serviceIcons = {
  estofados: 'sofa',
  colchoes: 'bed-flat',
  tapetes: 'rug',
  impermeabilizacao: 'shield-droplet',
} as const;

export function ServicesProjects() {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = section.current;
    const next = document.getElementById('processo');
    if (!element || !next) return;
    const query = window.matchMedia(
      '(min-width: 1200px) and (prefers-reduced-motion: no-preference)',
    );
    let frame = 0;
    const measure = () => {
      const headerHeight =
        document.querySelector('.site-header')?.getBoundingClientRect()
          .height ?? 67;
      element.style.setProperty(
        '--service-overlap-top',
        `${Math.min(headerHeight, window.innerHeight - element.offsetHeight)}px`,
      );
    };
    const update = () => {
      frame = 0;
      const nextBottom = next.getBoundingClientRect().bottom;
      const serviceBottom = element.getBoundingClientRect().bottom;
      const enabled = query.matches && nextBottom > 0;
      element.style.setProperty(
        '--service-overlap-clip',
        `${Math.max(0, serviceBottom - nextBottom)}px`,
      );
      element.dataset.overlap = String(enabled);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = () => {
      measure();
      schedule();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', resize);
    query.addEventListener('change', resize);
    measure();
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', resize);
      query.removeEventListener('change', resize);
      delete element.dataset.overlap;
      element.style.removeProperty('--service-overlap-top');
      element.style.removeProperty('--service-overlap-clip');
    };
  }, []);
  return (
    <section
      ref={section}
      id="servicos"
      className="services-projects"
      aria-labelledby="services-title"
      tabIndex={-1}
    >
      <SectionEyebrow className="service-projects-tag section">
        Higienização e proteção
      </SectionEyebrow>
      <div className="service-projects-runway">
        <div className="service-projects-sticky">
          <div className="service-projects-content section">
            <div className="service-projects-heading">
              <TitleReveal
                id="services-title"
                text={servicesContent.title}
                accent="Fritz"
              />
              <p>{servicesContent.introduction}</p>
            </div>
            <section
              className="service-projects-frame"
              aria-label="Serviços de higienização e impermeabilização"
            >
              <div className="service-projects-track tw:grid">
                {servicesContent.items.map((item) => (
                  <article className="service-project-card" key={item.id}>
                    <div className="service-project-media">
                      <ServiceVideo
                        id={item.id}
                        title={item.title}
                        poster={serviceVideoPosters[item.id].src}
                      />
                      <div
                        className="service-project-badge-pocket"
                        aria-hidden="true"
                      >
                        <span className="service-project-badge tw:flex tw:items-center tw:justify-center">
                          <FritzIcon name={serviceIcons[item.id]} />
                        </span>
                      </div>
                      <div className="service-project-copy">
                        <h3>{item.cardTitle}</h3>
                        <p className="service-project-description">
                          {item.cardText}
                        </p>
                      </div>
                      <div className="service-project-action-pocket">
                        <a
                          className="service-project-contact pill-link"
                          href={whatsappUrl(item.title.toLowerCase())}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Consultar ${item.title.toLowerCase()} pelo WhatsApp — abrir em nova aba`}
                          data-track-contact={`servicos ${item.id}`}
                        >
                          <HoverLabel variant="primary">
                            Pedir orçamento
                          </HoverLabel>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
