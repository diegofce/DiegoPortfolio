export function BrandMark({ className = '' }) {
  return (
    <svg
      className={className ? `brand-mark ${className}` : 'brand-mark'}
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        className="brand-mark-bracket"
        d="m18 8-10 16 10 16M30 8l10 16-10 16"
      />
      <path className="brand-mark-bridge" d="M19 24h10" />
      <circle className="brand-mark-accent" cx="24" cy="24" r="4" />
      <path className="brand-mark-success" d="M24 10v6M24 32v6" />
    </svg>
  );
}
