export function DiscIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#2f5233" />

      <ellipse cx="27" cy="37.5" rx="14" ry="3" fill="#182716" opacity="0.3" />
      <ellipse cx="26.25" cy="27.5" rx="14" ry="5.25" fill="#fdfbf3" />

      <circle cx="45" cy="39.5" r="9.5" fill="#4f7f8b" stroke="#2f5233" strokeWidth="1.25" />
      <path
        d="M 39.4 39.5 L 42.1 36.75 L 42.1 38.25 L 47.9 38.25 L 47.9 36.75 L 50.6 39.5 L 47.9 42.25 L 47.9 40.75 L 42.1 40.75 L 42.1 42.25 Z"
        fill="#fdfbf3"
      />
    </svg>
  )
}
