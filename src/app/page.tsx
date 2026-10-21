import { ZeloraReasons } from '@/components/zelora/reasons';
import { ZeloraBusinessHighlights } from '@/components/zelora/business-highlights';
import { ZeloraTrustStrip } from '@/components/zelora/trust-strip';
import { ZeloraPreview } from '@/components/zelora/preview';
export default function Home() {
  return (
    <>
      <ZeloraPreview />
      <ZeloraTrustStrip />
      <ZeloraBusinessHighlights />
      <ZeloraReasons />
      <footer className="zelora-site-footer">
        <p>
          <strong>Zelora Higienização</strong> · Projeto de apresentação.
          <br />
          Imagens ilustrativas geradas por IA.
        </p>
        <a href="tel:+5547991597258">(47) 99159-7258</a>
      </footer>
    </>
  );
}
