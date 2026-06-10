/**
 * Per-navigation wrapper: replays a soft fade/rise entrance on every route
 * change (layouts persist, templates remount — see Next.js template.js docs).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
