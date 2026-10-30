import type { Project } from '../data/projects';

// A project image with its caption. `fit: 'contain'` keeps logos and wide banners whole on the `bg` colour.
export default function ProjectImage({
  image,
  className = '',
}: {
  image: Project['images'][number];
  className?: string;
}) {
  return (
    <figure
      className={`relative overflow-hidden rounded-2xl border border-ink/10 ${className}`}
      style={{ background: image.bg }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className={`h-full w-full ${image.fit === 'contain' ? 'object-contain p-[8%]' : 'object-cover object-top'}`}
      />
      <figcaption className="absolute bottom-3 right-4 rounded-full bg-black/35 px-3 py-1 text-xs text-white/80 backdrop-blur">
        {image.caption}
      </figcaption>
    </figure>
  );
}
