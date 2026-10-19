export function TitleReveal({
  text,
  accent,
  level = 2,
  id,
  className,
}: {
  text: string;
  accent?: string;
  level?: 1 | 2 | 3;
  id?: string;
  className?: string;
}) {
  const accentIndex = accent ? text.lastIndexOf(accent) : -1;
  const Heading = level === 1 ? 'h1' : level === 3 ? 'h3' : 'h2';
  return (
    <Heading id={id} className={className} data-title-anim="">
      {accent && accentIndex >= 0 ? (
        <>
          {text.slice(0, accentIndex)}
          <span className="section-title-accent">{accent}</span>
          {text.slice(accentIndex + accent.length)}
        </>
      ) : (
        text
      )}
    </Heading>
  );
}
