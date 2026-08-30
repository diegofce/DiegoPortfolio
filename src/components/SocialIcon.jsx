export function SocialIcon({ type }) {
  const paths = {
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    linkedin: (
      <>
        <path d="M6.5 10v8M6.5 6.5v.01M11 18v-8M11 13.5c0-2.1 1.2-3.5 3.3-3.5s3.2 1.5 3.2 4v4" />
      </>
    ),
    github: (
      <>
        <path d="M9 19c-4 1.3-4-2-5.5-2.5M14.5 21v-3.4c0-1 .1-1.4-.5-2 2.9-.3 6-1.4 6-6A4.7 4.7 0 0 0 18.7 6a4.4 4.4 0 0 0-.1-3.4s-1.1-.3-3.5 1.3a12.1 12.1 0 0 0-6.2 0C6.5 2.3 5.4 2.6 5.4 2.6A4.4 4.4 0 0 0 5.3 6 4.7 4.7 0 0 0 4 9.6c0 4.6 3.1 5.7 6 6-.6.6-.6 1.2-.5 2V21" />
      </>
    ),
  };

  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}
