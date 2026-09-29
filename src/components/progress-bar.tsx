export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div className="progress-wrap">
      {label ? <div className="progress-label"><span>{label}</span><span>{safeValue}%</span></div> : null}
      <div className="progress-track" aria-label={label} role="progressbar" aria-valuenow={safeValue} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
