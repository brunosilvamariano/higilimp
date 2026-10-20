'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="higi-status">
      <p>HigiLimp</p>
      <h1>Não foi possível carregar esta página.</h1>
      <p>Tente novamente em alguns instantes.</p>
      <button type="button" onClick={reset}>
        Tentar novamente
      </button>
      <a href="/">Voltar ao início</a>
    </main>
  );
}
