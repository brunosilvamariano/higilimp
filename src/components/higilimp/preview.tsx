'use client';

import Image from 'next/image';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react';
import { navigation, primaryNavigation } from '@/config/navigation';
import logo from '@/assets/images/higilimp/logo.webp';
import owner from '@/assets/images/higilimp/proprietario.webp';
import { WhatsAppIcon } from '@/components/ui/social-icons';

const whatsapp =
  'https://wa.me/5547992509755?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20higieniza%C3%A7%C3%A3o.';
function adaptNavigation(item: { label: string; href: string }) {
  return {
    label: item.label.replace('Sobre o Fritz', 'Sobre a Higilimp'),
    href: item.href
      .replace('/#sobre-a-fritz', '#sobre-a-higilimp')
      .replace('/#', '#'),
  };
}
const mainLinks = primaryNavigation.map(adaptNavigation);
const allLinks = navigation.map(adaptNavigation);
function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Contact({ header = false }: { header?: boolean }) {
  return (
    <a
      className={`higi-cta${header ? ' higi-cta-header' : ''}`}
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="higi-cta-label">
        <span>{header ? 'Vamos conversar' : 'Pedir orçamento'}</span>
        <span aria-hidden="true">
          {header ? 'Vamos conversar' : 'Pedir orçamento'}
        </span>
      </span>
      <i>
        <WhatsAppIcon />
        <WhatsAppIcon />
      </i>
    </a>
  );
}
export function HigilimpPreview() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(SplitText);
    let disposed = false;
    let titleSplit: SplitText | undefined;
    let paragraphSplit: SplitText | undefined;
    const context = gsap.context(() => {
      gsap.set('.higi-hero', { clipPath: 'inset(50% 50% round 20px)' });
      gsap.set('.higi-word,.higi-copy,.higi-description', { opacity: 0 });
    }, root);
    document.fonts.ready.then(() => {
      if (disposed) return;
      context.add(() => {
        titleSplit = SplitText.create('.higi-copy h1', {
          type: 'chars',
          mask: 'chars',
        });
        paragraphSplit = SplitText.create('.higi-description>p', {
          type: 'lines',
          mask: 'lines',
        });
        gsap.set('.higi-copy,.higi-description', { opacity: 1 });
        const timeline = gsap.timeline({
          defaults: { ease: 'power2.out' },
          onComplete: () => {
            titleSplit?.revert();
            paragraphSplit?.revert();
          },
        });
        timeline
          .to(
            '.higi-hero',
            { clipPath: 'inset(0% 0% round 20px)', duration: 1.5 },
            0.25,
          )
          .fromTo(
            '.higi-owner',
            { scale: 1.25 },
            { scale: 1, duration: 1.25 },
            0.25,
          )
          .fromTo(
            '.higi-word',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6 },
            1.59,
          )
          .fromTo(
            titleSplit.chars,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, stagger: 0.02, duration: 0.6 },
            2.11,
          )
          .fromTo(
            '.higi-eyebrow',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            2.11,
          )
          .fromTo(
            paragraphSplit.lines,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 },
            2.94,
          )
          .fromTo(
            '.higi-description>.higi-cta,.higi-footnote',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 },
            3.09,
          );
      });
    });
    return () => {
      disposed = true;
      context.revert();
      titleSplit?.revert();
      paragraphSplit?.revert();
    };
  }, []);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  function openMenu() {
    dialog.current?.showModal();
    setOpen(true);
    setNotice('');
  }
  function closeMenu() {
    dialog.current?.close();
  }
  function handleSection(
    event: MouseEvent<HTMLAnchorElement>,
    label: string,
    href: string,
  ) {
    if (href === '#inicio') {
      closeMenu();
      return;
    }
    if (href === '#contato') return;
    event.preventDefault();
    if (!dialog.current?.open) openMenu();
    setNotice(
      `${label}: esta seção está preservada, mas ainda oculta nesta prévia.`,
    );
  }
  return (
    <main ref={root} id="inicio" className="higi-preview">
      <a className="higi-skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="higi-header">
        <a href="#inicio" className="higi-logo" aria-label="HigiLimp — início">
          <Image
            src={logo}
            alt="HigiLimp — Joinville, SC"
            priority
            sizes="153px"
          />
        </a>
        <nav className="higi-nav" aria-label="Navegação principal">
          <div className="higi-nav-shape" aria-hidden="true" />
          {mainLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href === '#contato' ? whatsapp : href}
              onClick={(event) => handleSection(event, label, href)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="higi-header-actions">
          <Contact header />
          <button
            ref={toggle}
            className="higi-menu-toggle"
            type="button"
            aria-label="Abrir menu completo"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="higi-menu"
            onClick={openMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="higi-menu"
        className="higi-menu-dialog"
        aria-labelledby="higi-menu-title"
        onClose={() => {
          setOpen(false);
          toggle.current?.focus({ preventScroll: true });
        }}
      >
        <div className="higi-menu-top">
          <div className="higi-logo">
            <Image src={logo} alt="HigiLimp" sizes="153px" />
          </div>
          <button
            type="button"
            className="higi-menu-close"
            aria-label="Fechar menu"
            onClick={closeMenu}
          >
            <span />
            <span />
          </button>
        </div>
        <div className="higi-menu-body">
          <div className="higi-menu-navigation">
            <p id="higi-menu-title" className="higi-menu-eyebrow">
              Explore a Higilimp
            </p>
            <nav className="higi-menu-grid" aria-label="Menu completo">
              {allLinks.map(({ label, href }, index) => (
                <a
                  key={href}
                  href={href === '#contato' ? whatsapp : href}
                  onClick={(event) => handleSection(event, label, href)}
                >
                  <span className="higi-menu-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{label}</span>
                  <Arrow />
                </a>
              ))}
            </nav>
          </div>
          <aside className="higi-menu-contact">
            <p className="higi-menu-eyebrow">Seu cuidado começa aqui.</p>
            <h2>
              Mais higiene.
              <br />
              Mais bem-estar.
            </h2>
            <Contact />
            <div className="higi-menu-details">
              <span>Joinville e região</span>
              <a href="tel:+5547992509755">(47) 99250-9755</a>
              <a
                href="https://www.instagram.com/higilimp.oficial/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <Arrow />
              </a>
            </div>
          </aside>
        </div>
        <div className="higi-menu-bottom">
          <p>Prévia de apresentação · somente header e hero visíveis.</p>
          <p role="status" aria-live="polite">
            {notice}
          </p>
        </div>
      </dialog>
      <section id="conteudo" className="higi-hero" aria-labelledby="higi-title">
        <div className="higi-word" aria-hidden="true">
          Higienização
        </div>
        <div className="higi-glow" aria-hidden="true" />
        <Image
          className="higi-owner"
          src={owner}
          alt="Proprietário da HigiLimp, de uniforme e braços cruzados"
          priority
          sizes="(max-width: 700px) 470px, 56vw"
        />
        <div className="higi-shade" aria-hidden="true" />
        <div className="higi-copy">
          <p className="higi-eyebrow">
            <span />
            JOINVILLE E REGIÃO
          </p>
          <h1 id="higi-title">
            Mais cuidado.
            <br />
            Mais conforto
            <br className="higi-mobile-break" /> para sua vida.
          </h1>
        </div>
        <div className="higi-description">
          <p>
            Higienização profissional de estofados, com atenção a cada detalhe.
            Para sua casa, sua empresa e tudo o que faz parte da sua rotina.
          </p>
          <Contact />
          <span className="higi-footnote">
            Seu cuidado começa com uma conversa.
          </span>
        </div>
      </section>
    </main>
  );
}
