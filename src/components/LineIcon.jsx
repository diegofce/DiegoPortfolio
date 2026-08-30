export function LineIcon({ type = 'node' }) {
  const paths = {
    node: (
      <>
        <circle cx="12" cy="4" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path d="m10.8 5.6-4.6 11.7m7-11.7 4.6 11.7M7 19h10" />
      </>
    ),
    server: (
      <>
        <rect x="4" y="4" width="16" height="6" rx="1" />
        <rect x="4" y="14" width="16" height="6" rx="1" />
        <path d="M8 7h.01M8 17h.01M11 7h5M11 17h5" />
      </>
    ),
    browser: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01M13 6.5h.01M8 14l2 2 4-5" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" />
      </>
    ),
    container: (
      <>
        <path d="M4 8h16v10H4zM4 8l8-4 8 4M12 4v14M8 6v12M16 6v12" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 13 9 5 9-5M3 18l9 5 9-5" />
      </>
    ),
    spark: (
      <>
        <path d="M12 2v5M12 17v5M4.9 4.9l3.5 3.5M15.6 15.6l3.5 3.5M2 12h5M17 12h5M4.9 19.1l3.5-3.5M15.6 8.4l3.5-3.5" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    api: (
      <>
        <path d="M7 8h10M7 16h10M4 12h16" />
        <circle cx="5" cy="8" r="2" />
        <circle cx="19" cy="12" r="2" />
        <circle cx="5" cy="16" r="2" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="12" r="4" />
        <path d="M12 12h9M17 12v3M20 12v2" />
      </>
    ),
    hexagon: (
      <>
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path d="M8.5 12h7M12 8.5v7" />
      </>
    ),
    terminal: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m7 10 3 2-3 2M12 15h5" />
      </>
    ),
    prompt: (
      <>
        <path d="M5 6h14v8H9l-4 4V6Z" />
        <path d="M8 10h.01M11 10h5" />
      </>
    ),
    code: (
      <>
        <path d="m9 7-5 5 5 5M15 7l5 5-5 5M13 5l-2 14" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8M12 4v16M6 9c0 2.2 1.3 4.1 3.2 5s4.1 1 5.8-0.2" />
      </>
    ),
    circle: <circle cx="12" cy="12" r="7" />,
  };
  return (
    <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[type] || paths.node}
    </svg>
  );
}
