export function ProgressRing({ value, label, size = 32 }: { value: number; label?: string; size?: number }) {
  const safeValue = Math.min(100, Math.max(0, value));
  const stroke = 3.5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  return (
    <div className="progress-ring-wrap">
      <svg
        className="progress-ring"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="progressbar"
        aria-label={label ?? `${safeValue}% complete`}
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <circle className="progress-ring-track" cx={center} cy={center} r={radius} strokeWidth={stroke} />
        {safeValue > 0 ? (
          <circle
            className="progress-ring-value"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - safeValue / 100)}
            transform={`rotate(-90 ${center} ${center})`}
          />
        ) : null}
        <text className="progress-ring-text" x="50%" y="50%" textAnchor="middle" dominantBaseline="central">{safeValue}</text>
      </svg>
      {label ? <span className="progress-ring-label">{label}</span> : null}
    </div>
  );
}
