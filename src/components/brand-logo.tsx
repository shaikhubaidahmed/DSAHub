export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-lockup ${compact ? "is-compact" : ""}`}>
      <svg className="brand-logo" viewBox="0 0 48 48" role="img" aria-label="DSAHub logo">
        <rect className="logo-tile" x="1.5" y="1.5" width="45" height="45" rx="12" />
        <path className="logo-dsa" d="m17 11-8 13 8 13" />
        <path className="logo-hub" d="m31 11 8 13-8 13" />
        <path className="logo-bridge" d="M17 24h14" />
        <circle className="logo-node" cx="24" cy="24" r="3.2" />
      </svg>
      {!compact && (
        <span className="brand-copy" aria-hidden="true">
          <span className="brand-name"><span className="wordmark-dsa">DSA</span><span className="wordmark-hub">Hub</span></span>
          <span className="brand-subtitle">practice system</span>
        </span>
      )}
    </span>
  );
}
