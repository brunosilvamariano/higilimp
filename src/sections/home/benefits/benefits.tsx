import { WhatsAppIcon } from '@/components/ui/social-icons';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { TitleReveal } from '@/animations/title-reveal';
import { ResponsiveImage } from '@/components/media/responsive-image';
import { whatsappUrl } from '@/config/contact';
import { benefitsContent } from './benefits.content';
import { benefitImages } from './benefits.images';
import './benefits.css';

export function Benefits() {
  return (
    <section
      id="beneficios"
      className="benefits section"
      aria-labelledby="benefits-title"
      tabIndex={-1}
    >
      <div className="benefits-heading">
        <SectionEyebrow className="benefits-eyebrow">
          Por que escolher o Fritz
        </SectionEyebrow>
        <TitleReveal
          id="benefits-title"
          text={benefitsContent.title}
          accent="cuidado."
        />
      </div>
      <div className="benefits-grid tw:grid">
        {benefitsContent.items.map((item) => (
          <article className="benefit-card" key={item.id}>
            <div className="benefit-visual">
              <div className="benefit-photo">
                <ResponsiveImage
                  {...benefitImages[item.id]}
                  sizes="(min-width: 1600px) 464px, (min-width: 768px) 30vw, 90vw"
                />
              </div>
              <div className="benefit-action-pocket">
                <a
                  className="benefit-action tw:flex tw:items-center tw:justify-center"
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.title}: conversar pelo WhatsApp — abrir em nova aba`}
                  data-track-contact={`beneficios ${item.id}`}
                >
                  <WhatsAppIcon />
                </a>
              </div>
            </div>
            <div className="benefit-copy">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
