import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="zelora-status">
      <p>Zelora</p>
      <h1>Página não encontrada.</h1>
      <p>Confira o endereço ou volte para o início.</p>
      <Link href="/">Voltar ao início</Link>
    </main>
  );
}
