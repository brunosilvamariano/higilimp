'use client';

import { useState, type CSSProperties } from 'react';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { TitleReveal } from '@/animations/title-reveal';
import { HoverLabel } from '@/components/ui/hover-label';
import { whatsappUrl } from '@/config/contact';
import { serviceAreas } from '@/content/service-areas';
import map from './service-area-map.json';
import './service-area.css';

const cities = map.cities.map((point) => ({
  ...point,
  name: serviceAreas.find(({ id }) => id === point.id)?.name ?? '',
}));

export function ServiceArea() {
  const [selected, setSelected] = useState(cities[0].id);
  const city = cities.find((item) => item.id === selected) ?? cities[0];
  const served = new Set(cities.map((item) => item.id));

  return (
    <section
      id="onde-atendemos"
      className="service-area section"
      aria-labelledby="service-area-title"
      tabIndex={-1}
    >
      <div className="service-area-layout tw:grid">
        <div className="service-area-heading">
          <SectionEyebrow>Onde o Fritz atende</SectionEyebrow>
          <TitleReveal
            id="service-area-title"
            text="Esse cuidado chega até você."
            accent="até você."
          />
          <p>
            De Joinville ao litoral catarinense, o cuidado do Fritz encontra o
            caminho até a sua casa.
          </p>
        </div>

        <div className="service-area-map-group">
          <fieldset
            className="service-area-map"
            aria-label="Mapa das cidades atendidas pelo Fritz no litoral de Santa Catarina"
          >
            <div className="service-area-coast-detail">
              <span className="service-area-detail-title">
                Cidades atendidas · SC
              </span>
              <div className="service-area-map-layer">
                <svg
                  className="service-area-geography"
                  viewBox={`0 0 ${map.width} ${map.height}`}
                  aria-hidden="true"
                  focusable="false"
                >
                  <defs>
                    <pattern
                      id="service-area-coast-dots"
                      width="7"
                      height="7"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="2" cy="2" r="1.2" fill="#aeb8c5" />
                    </pattern>
                  </defs>
                  <g>
                    {map.paths.map((area) => (
                      <path
                        key={area.id}
                        d={area.d}
                        className="service-area-territory"
                        data-served={served.has(area.id)}
                        data-active={area.id === selected}
                      />
                    ))}
                  </g>
                </svg>
                {cities.map((item) => (
                  <button
                    key={item.id}
                    className="service-area-point tw:flex tw:items-center tw:justify-center"
                    type="button"
                    aria-label={`Selecionar ${item.name}`}
                    aria-pressed={item.id === selected}
                    data-active={item.id === selected}
                    data-west={item.id === cities[0].id}
                    style={
                      {
                        '--point-x': `${(item.x / map.width) * 100}%`,
                        '--point-y': `${(item.y / map.height) * 100}%`,
                      } as CSSProperties
                    }
                    onClick={() => setSelected(item.id)}
                  >
                    <span className="service-area-dot" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                    </span>
                    <span
                      className="service-area-point-label"
                      aria-hidden="true"
                    >
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </fieldset>
          <div className="service-area-map-caption">
            <span className="service-area-caption-hint">
              Selecione uma cidade no mapa
            </span>
          </div>
        </div>

        <div className="service-area-details">
          <a
            href={whatsappUrl(`atendimento em ${city.name}`)}
            className="pill-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar atendimento em ${city.name} pelo WhatsApp — abrir em nova aba`}
            data-track-contact={`regiao ${city.name}`}
          >
            <span className="service-area-action-prefix">Atendimento em</span>
            <span className="service-area-action-size" aria-hidden="true">
              Balneário Barra do Sul
            </span>
            <HoverLabel variant="primary">{city.name}</HoverLabel>
          </a>
        </div>
      </div>
      <p className="service-area-credits">
        Geografia:{' '}
        <a
          href="https://servicodados.ibge.gov.br/api/docs/malhas?versao=3"
          target="_blank"
          rel="noopener noreferrer"
        >
          IBGE
        </a>{' '}
        · Pontos:{' '}
        <a
          href="https://github.com/kelvins/municipios-brasileiros"
          target="_blank"
          rel="noopener noreferrer"
        >
          Municípios Brasileiros
        </a>
      </p>
    </section>
  );
}
