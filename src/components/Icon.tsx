// Line icon in a soft tile; paths use a 24x24 grid and the arrow icon's stroke style.
export function Icon({ children, size = 'h-11 w-11' }: { children: React.ReactNode; size?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-xl bg-ink/[0.06] text-ink ${size}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-[45%] w-[45%]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </span>
  );
}

const GLYPHS = {
  ingest: <path d="M12 3v11m-4-4 4 4 4-4M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />,
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M10 10h4v4h-4zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </>
  ),
  chart: <path d="M4 20V10m6 10V4m6 16v-7m4 7H3" />,
  bell: <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4" />,
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </>
  ),
  sync: <path d="M20 8a8 8 0 0 0-14.5-2M4 4v4h4M4 16a8 8 0 0 0 14.5 2M20 20v-4h-4" />,
  lock: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="4" width="16" height="7" rx="1.5" />
      <rect x="4" y="13" width="16" height="7" rx="1.5" />
      <path d="M8 7.5h.01M8 16.5h.01" />
    </>
  ),
  spark: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3 6" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  cloud: <path d="M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 9.5a4.3 4.3 0 0 1-.5 8.5z" />,
  flask: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 15h9" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  alert: <path d="M12 4 2.5 20h19zM12 10v4M12 17h.01" />,
};

export type Glyph = keyof typeof GLYPHS;

// First matching keyword wins, so the more specific words come first.
const KEYWORDS: [RegExp, Glyph][] = [
  [/encrypt|key|secur|auth/i, 'lock'],
  [/voice|audio/i, 'mic'],
  [/presence|workspace/i, 'users'],
  [/chat|message|\bdms?\b/i, 'chat'],
  [/ingest|collect|upload/i, 'ingest'],
  [/model|forecast|predict|risk|anomal|learn/i, 'spark'],
  [/transcod|build|runner|render|device/i, 'cpu'],
  [/player|frontend|client/i, 'monitor'],
  [/deliver|rout|gateway|cdn|\bedge|\bmap\b|lora/i, 'globe'],
  [/alert|notif|alarm/i, 'bell'],
  [/analytic|measur|quality|stat|metric|log|trace/i, 'chart'],
  [/sync|local|crdt|merge|reconnect/i, 'sync'],
  [/store|storage|ledger|book|event|insert|kafka|mongo|pgvector|database|data/i, 'database'],
  [/infra|cloud/i, 'cloud'],
  [/control plane|deploy|server|backend/i, 'server'],
  [/answer|chunk|rank|citation|version|ai\b/i, 'spark'],
  [/cach|slow|fast|burst|speed|latency|plan|heat|energy|peak/i, 'bolt'],
  [/test/i, 'flask'],
];

export const glyphFor = (title: string, fallback: Glyph): Glyph =>
  KEYWORDS.find(([re]) => re.test(title))?.[1] ?? fallback;

// An icon tile picked from the title's keywords.
export function TopicIcon({ title, fallback, size }: { title: string; fallback: Glyph; size?: string }) {
  return <Icon size={size}>{GLYPHS[glyphFor(title, fallback)]}</Icon>;
}
