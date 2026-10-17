// Placeholder for a project screenshot: a mock app window tinted with the project's hue.
// Swap for a real <img> once screenshots exist.
export default function ProjectImage({
  name,
  caption,
  hue,
  className = '',
}: {
  name: string;
  caption: string;
  hue: number;
  className?: string;
}) {
  return (
    <figure
      role="img"
      aria-label={`${name}: ${caption} (placeholder)`}
      className={`relative overflow-hidden rounded-2xl border border-ink/10 ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, hsl(${hue} 45% 62% / 0.55), transparent 60%),
          radial-gradient(90% 80% at 10% 100%, hsl(${hue + 30} 35% 45% / 0.45), transparent 65%),
          linear-gradient(135deg, hsl(${hue} 18% 22%), hsl(${hue} 22% 12%))`,
      }}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/20 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="ml-3 truncate rounded-md bg-white/10 px-3 py-0.5 text-[11px] text-white/60">
          {name.toLowerCase()}.app
        </span>
      </div>
      <div className="grid h-[calc(100%-2.5rem)] grid-cols-[1fr_2fr] gap-3 p-4" aria-hidden="true">
        <div className="space-y-2">
          {[70, 55, 80, 45, 65].map((w, i) => (
            <div key={i} className="h-2.5 rounded-full bg-white/15" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="grid grid-rows-[2fr_1fr] gap-3">
          <div className="rounded-xl bg-white/10" />
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-white/10" />
            <div className="rounded-lg bg-white/10" />
            <div className="rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
      <figcaption className="absolute bottom-3 right-4 rounded-full bg-black/35 px-3 py-1 text-xs text-white/80 backdrop-blur">
        {caption}. Screenshot coming soon.
      </figcaption>
    </figure>
  );
}
