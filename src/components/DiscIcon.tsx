export function DiscIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="26" cy="34" rx="16" ry="6" fill="var(--color-primary)" />
      <ellipse
        cx="26"
        cy="34"
        rx="16"
        ry="6"
        fill="none"
        stroke="var(--color-background)"
        strokeWidth="0.8"
        opacity="0.4"
      />
      <ellipse
        cx="26"
        cy="33"
        rx="9"
        ry="3"
        fill="none"
        stroke="var(--color-background)"
        strokeWidth="0.8"
        opacity="0.45"
      />

      <circle cx="46" cy="42" r="11" fill="var(--color-accent)" />
      <g stroke="var(--color-accent-foreground)" strokeWidth="1.7" strokeLinecap="round" fill="none">
        <path d="M 56.3 45.8 A 11.0 11.0 0 0 1 35.7 45.8" />
        <path d="M 35.7 38.2 A 11.0 11.0 0 0 1 56.3 38.2" />
      </g>
      <polygon points="34.3,42.1 39.9,47.0 33.2,49.4" fill="var(--color-accent-foreground)" />
      <polygon points="57.7,41.9 52.1,37.0 58.8,34.6" fill="var(--color-accent-foreground)" />
    </svg>
  )
}
