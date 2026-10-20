import { HigilimpBusinessHighlights } from '@/components/higilimp/business-highlights';
import { HigilimpTrustStrip } from '@/components/higilimp/trust-strip';
import { HigilimpPreview } from '@/components/higilimp/preview';
export default function Home() {
  return (
    <>
      <HigilimpPreview />
      <HigilimpTrustStrip />
      <HigilimpBusinessHighlights />
    </>
  );
}
