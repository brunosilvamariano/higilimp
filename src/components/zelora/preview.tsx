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
import logo from '@/assets/images/zelora/logo.svg';
import owner from '@/assets/images/zelora/pessoa-blusa-azul-hero.webp';
import { WhatsAppIcon } from '@/components/ui/social-icons';

const whatsapp =
  'https://wa.me/5547991597258?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20higieniza%C3%A7%C3%A3o.';
const mainLinks = primaryNavigation;
const allLinks = navigation;
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
export function Contact({
  header = false,
  label,
  href = whatsapp,
  ariaLabel,
}: {
  header?: boolean;
  label?: string;
  href?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      className={`zelora-cta${header ? ' zelora-cta-header' : ''}`}
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="zelora-cta-label">
        <span>{label ?? (header ? 'Vamos conversar' : 'Pedir orçamento')}</span>
        <span aria-hidden="true">
          {label ?? (header ? 'Vamos conversar' : 'Pedir orçamento')}
        </span>
      </span>
      <i>
        <WhatsAppIcon />
        <WhatsAppIcon />
      </i>
    </a>
  );
}
export function ZeloraPreview() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(SplitText);
    let disposed = false;
    let titleSplit: SplitText | undefined;
    let paragraphSplit: SplitText | undefined;
    const context = gsap.context(() => {
      gsap.set('.zelora-hero', { clipPath: 'inset(50% 50% round 20px)' });
      gsap.set('.zelora-word,.zelora-copy,.zelora-description', { opacity: 0 });
    }, root);
    document.fonts.ready.then(() => {
      if (disposed) return;
      context.add(() => {
        titleSplit = SplitText.create('.zelora-copy h1', {
          type: 'chars',
          mask: 'chars',
        });
        paragraphSplit = SplitText.create('.zelora-description>p', {
          type: 'lines',
          mask: 'lines',
        });
        gsap.set('.zelora-copy,.zelora-description', { opacity: 1 });
        const timeline = gsap.timeline({
          defaults: { ease: 'power2.out' },
          onComplete: () => {
            titleSplit?.revert();
            paragraphSplit?.revert();
          },
        });
        timeline
          .to(
            '.zelora-hero',
            { clipPath: 'inset(0% 0% round 20px)', duration: 1.5 },
            0.25,
          )
          .fromTo(
            '.zelora-owner',
            { scale: 1.25 },
            { scale: 1, duration: 1.25 },
            0.25,
          )
          .fromTo(
            '.zelora-word',
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
            '.zelora-eyebrow',
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
            '.zelora-description>.zelora-cta,.zelora-footnote',
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
    if (href.startsWith('#') && document.getElementById(href.slice(1))) {
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
    <main ref={root} id="inicio" className="zelora-preview">
      <a className="zelora-skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="zelora-header">
        <a href="#inicio" className="zelora-logo" aria-label="Zelora — início">
          <Image
            src={logo}
            alt="Zelora — Joinville, SC"
            priority
            sizes="153px"
          />
        </a>
        <nav className="zelora-nav" aria-label="Navegação principal">
          <div className="zelora-nav-shape" aria-hidden="true" />
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
        <div className="zelora-header-actions">
          <Contact header />
          <button
            ref={toggle}
            className="zelora-menu-toggle"
            type="button"
            aria-label="Abrir menu completo"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="zelora-menu"
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
        id="zelora-menu"
        className="zelora-menu-dialog"
        aria-labelledby="zelora-menu-title"
        onClose={() => {
          setOpen(false);
          toggle.current?.focus({ preventScroll: true });
        }}
      >
        <div className="zelora-menu-top">
          <div className="zelora-logo">
            <Image src={logo} alt="Zelora" sizes="153px" />
          </div>
          <button
            type="button"
            className="zelora-menu-close"
            aria-label="Fechar menu"
            onClick={closeMenu}
          >
            <span />
            <span />
          </button>
        </div>
        <div className="zelora-menu-body">
          <div className="zelora-menu-navigation">
            <p id="zelora-menu-title" className="zelora-menu-eyebrow">
              Explore a Zelora
            </p>
            <nav className="zelora-menu-grid" aria-label="Menu completo">
              {allLinks.map(({ label, href }, index) => (
                <a
                  key={href}
                  href={href === '#contato' ? whatsapp : href}
                  onClick={(event) => handleSection(event, label, href)}
                >
                  <span className="zelora-menu-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{label}</span>
                  <Arrow />
                </a>
              ))}
            </nav>
          </div>
          <aside className="zelora-menu-contact">
            <p className="zelora-menu-eyebrow">Seu cuidado começa aqui.</p>
            <h2>
              Mais higiene.
              <br />
              Mais bem-estar.
            </h2>
            <Contact />
            <div className="zelora-menu-details">
              <span>Joinville e região</span>
              <a href="tel:+5547991597258">(47) 99159-7258</a>
            </div>
          </aside>
        </div>
        <div className="zelora-menu-bottom">
          <p>Prévia de apresentação · seções selecionadas da Zelora.</p>
          <p role="status" aria-live="polite">
            {notice}
          </p>
        </div>
      </dialog>
      <section
        id="conteudo"
        className="zelora-hero"
        aria-labelledby="zelora-title"
      >
        <div className="zelora-word" aria-hidden="true">
          Higienização
        </div>
        <div className="zelora-glow" aria-hidden="true" />
        <Image
          className="zelora-owner"
          src={owner}
          alt="Pessoa sorrindo com blusa azul"
          priority
          sizes="(max-width: 700px) 410px, (max-width: 1100px) 560px, 60vw"
        />
        <div className="zelora-shade" aria-hidden="true" />
        <div className="zelora-copy">
          <p className="zelora-eyebrow">
            <span />
            JOINVILLE E REGIÃO
          </p>
          <h1 id="zelora-title">
            Mais cuidado.
            <br />
            Mais conforto
            <br className="zelora-mobile-break" /> para sua vida.
          </h1>
        </div>
        <div className="zelora-description">
          <p>
            Higienização profissional de estofados, com atenção a cada detalhe.
            Para sua casa, sua empresa e tudo o que faz parte da sua rotina.
          </p>
          <Contact />
          <span className="zelora-footnote">
            Seu cuidado começa com uma conversa.
          </span>
        </div>
      </section>
    </main>
  );
}
