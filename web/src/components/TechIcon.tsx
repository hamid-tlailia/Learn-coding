/** Simplified technology marks for stage badges and course cards. */
export type Tech = "start" | "html" | "css" | "js" | "git" | "react" | "node" | "mobile" | "pro";

export function TechIcon({ tech, className = "size-10" }: { tech: Tech; className?: string }) {
  switch (tech) {
    case "start":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true" direction="ltr">
          <path d="M16 3c5 3 8 8 8 14l-3 4h-10l-3-4c0-6 3-11 8-14z" fill="#fff" />
          <circle cx="16" cy="13" r="3" fill="#8b5cf6" />
          <path d="M11 21l-4 5 6-2zM21 21l4 5-6-2z" fill="#22d3ee" />
          <path d="M14 24h4l-2 5z" fill="#f5b544" />
        </svg>
      );
    case "pro":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true" direction="ltr">
          <path d="M9 4h14v6a7 7 0 0 1-14 0z" fill="#f5b544" />
          <path d="M9 6H5v2a5 5 0 0 0 5 5M23 6h4v2a5 5 0 0 1-5 5" fill="none" stroke="#f5b544" strokeWidth="2" />
          <rect x="14" y="16" width="4" height="6" fill="#d97706" />
          <rect x="9" y="22" width="14" height="5" rx="1.5" fill="#fff" />
          <path d="M16 6.5l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z" fill="#fff" />
        </svg>
      );
    case "html":
    case "css":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true" direction="ltr">
          <path d="M5 3h22l-2 23-9 3-9-3z" fill={tech === "html" ? "#e44d26" : "#1572b6"} />
          <path d="M16 5v22l7-2 1.7-20z" fill={tech === "html" ? "#f16529" : "#33a9dc"} />
          <text x="16" y="21.5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="system-ui">
            {tech === "html" ? "5" : "3"}
          </text>
        </svg>
      );
    case "js":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true" direction="ltr">
          <rect x="3" y="3" width="26" height="26" rx="4" fill="#f7df1e" />
          <text x="25" y="25" textAnchor="end" fontSize="12" fontWeight="800" fill="#222" fontFamily="system-ui">
            JS
          </text>
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true" direction="ltr" fill="none" stroke="#61dafb" strokeWidth="1.6">
          <ellipse cx="16" cy="16" rx="13" ry="5" />
          <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" />
          <circle cx="16" cy="16" r="2.4" fill="#61dafb" stroke="none" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true" direction="ltr">
          <rect x="5" y="5" width="22" height="22" rx="3" transform="rotate(45 16 16)" fill="#f05032" />
          <g stroke="#fff" strokeWidth="2" fill="#fff">
            <path d="M12 10v12M12 15c4 0 8 0 8 4" fill="none" />
            <circle cx="12" cy="10" r="1.8" />
            <circle cx="12" cy="22" r="1.8" />
            <circle cx="20" cy="19" r="1.8" />
          </g>
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true" direction="ltr">
          <path d="M16 2 28 9v14l-12 7-12-7V9z" fill="#3c873a" />
          <text x="16" y="20" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="system-ui">
            API
          </text>
        </svg>
      );
    case "mobile":
      return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true" direction="ltr">
          <rect x="8" y="2" width="16" height="28" rx="4" fill="#8b5cf6" />
          <rect x="10" y="5" width="12" height="20" rx="1.5" fill="#22d3ee" />
          <circle cx="16" cy="27.5" r="1.2" fill="#fff" />
        </svg>
      );
  }
}
