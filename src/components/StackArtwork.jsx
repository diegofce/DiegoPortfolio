export const STACK_SYMBOLS = {
  Backend: 'server',
  Frontend: 'browser',
  Databases: 'database',
  Infrastructure: 'container',
  Architecture: 'layers',
  'AI & Automation': 'spark',
};

export function StackArtwork({ category }) {
  const type = STACK_SYMBOLS[category];
  return (
    <svg className="stack-art" viewBox="0 0 180 180" aria-hidden="true">
      <path d="M24 36h132M24 72h132M24 108h132M24 144h132M36 24v132M72 24v132M108 24v132M144 24v132" />
      {type === 'server' && (
        <>
          <rect x="44" y="44" width="92" height="32" rx="6" />
          <rect x="44" y="104" width="92" height="32" rx="6" />
          <path d="M58 60h8M78 60h42M58 120h8M78 120h42" />
        </>
      )}
      {type === 'browser' && (
        <>
          <rect x="42" y="42" width="96" height="88" rx="8" />
          <path d="M42 66h96M62 52h1M78 52h1M66 96l16 16 34-40" />
        </>
      )}
      {type === 'database' && (
        <>
          <ellipse cx="90" cy="54" rx="48" ry="18" />
          <path d="M42 54v70c0 10 21.5 18 48 18s48-8 48-18V54M42 90c0 10 21.5 18 48 18s48-8 48-18" />
        </>
      )}
      {type === 'container' && (
        <>
          <path d="M44 68h92v58H44zM44 68l46-24 46 24M90 44v82M62 58v68M118 58v68" />
        </>
      )}
      {type === 'layers' && (
        <>
          <path d="m90 38 56 30-56 30-56-30 56-30Z" />
          <path d="m34 92 56 30 56-30M34 116l56 30 56-30" />
        </>
      )}
      {type === 'spark' && (
        <>
          <circle cx="90" cy="90" r="22" />
          <path d="M90 26v28M90 126v28M26 90h28M126 90h28M45 45l20 20M115 115l20 20M45 135l20-20M115 65l20-20" />
        </>
      )}
    </svg>
  );
}
