import caddy from '../assets/stack/caddy.svg';
import celery from '../assets/stack/celery.svg';
import clickhouse from '../assets/stack/clickhouse.svg';
import d3 from '../assets/stack/d3.svg';
import fastapi from '../assets/stack/fastapi.svg';
import ffmpeg from '../assets/stack/ffmpeg.svg';
import github from '../assets/stack/github.svg';
import grafana from '../assets/stack/grafana.svg';
import helm from '../assets/stack/helm.svg';
import kafka from '../assets/stack/apachekafka.svg';
import kubernetes from '../assets/stack/kubernetes.svg';
import minio from '../assets/stack/minio.svg';
import opentelemetry from '../assets/stack/opentelemetry.svg';
import prometheus from '../assets/stack/prometheus.svg';
import redis from '../assets/stack/redis.svg';
import sqlite from '../assets/stack/sqlite.svg';
import vitest from '../assets/stack/vitest.svg';
import webrtc from '../assets/stack/webrtc.svg';
import zod from '../assets/stack/zod.svg';
import { STACK, type Tech } from './stack';

// Logos for every technology named on the site (Simple Icons, CC0), keyed by display name.
// The headline tiles in STACK keep their curated colours; the rest use the brand colour.
const EXTRA: Record<string, { icon: string; hex: string }> = {
  Redis: { icon: redis, hex: '#FF4438' },
  Kafka: { icon: kafka, hex: '#231F20' },
  ClickHouse: { icon: clickhouse, hex: '#FFCC01' },
  Kubernetes: { icon: kubernetes, hex: '#326CE5' },
  Caddy: { icon: caddy, hex: '#1F88C0' },
  Prometheus: { icon: prometheus, hex: '#E6522C' },
  Grafana: { icon: grafana, hex: '#F46800' },
  Vitest: { icon: vitest, hex: '#00FF74' },
  D3: { icon: d3, hex: '#F9A03C' },
  FastAPI: { icon: fastapi, hex: '#009688' },
  WebRTC: { icon: webrtc, hex: '#333333' },
  FFmpeg: { icon: ffmpeg, hex: '#007808' },
  Celery: { icon: celery, hex: '#37814A' },
  Zod: { icon: zod, hex: '#408AFF' },
  OpenTelemetry: { icon: opentelemetry, hex: '#2F2F2F' },
  Helm: { icon: helm, hex: '#0F1689' },
  MinIO: { icon: minio, hex: '#C72E49' },
  SQLite: { icon: sqlite, hex: '#003B57' },
  'GitHub Apps API': { icon: github, hex: '#181717' },
};

const ALIASES: Record<string, string> = { Postgres: 'PostgreSQL', Tailwind: 'Tailwind CSS' };

// Dark text on light brand colours (ClickHouse yellow, Vitest green), white on the rest.
const readableOn = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.6 ? '#1a1a1a' : '#ffffff';
};

const BY_NAME: Record<string, Tech> = Object.fromEntries([
  ...STACK.flat().map(t => [t.name, t]),
  ...Object.entries(EXTRA).map(([name, { icon, hex }]) => [name, { name, icon, bg: hex, fg: readableOn(hex) }]),
]);

// Undefined for technologies without a logo; callers show a lettered fallback.
export const techLogo = (name: string): Tech | undefined => BY_NAME[ALIASES[name] ?? name];

// Official site or reference docs for every tool and concept named on the site.
const URLS: Record<string, string> = {
  BM25: 'https://en.wikipedia.org/wiki/Okapi_BM25',
  Caddy: 'https://caddyserver.com',
  Celery: 'https://docs.celeryq.dev',
  ClickHouse: 'https://clickhouse.com',
  CloudFront: 'https://aws.amazon.com/cloudfront/',
  D3: 'https://d3js.org',
  Docker: 'https://www.docker.com',
  'Embeddings API': 'https://en.wikipedia.org/wiki/Sentence_embedding',
  'Event sourcing': 'https://martinfowler.com/eaaDev/EventSourcing.html',
  FFmpeg: 'https://ffmpeg.org',
  FastAPI: 'https://fastapi.tiangolo.com',
  Figma: 'https://www.figma.com',
  Firecracker: 'https://firecracker-microvm.github.io',
  Git: 'https://git-scm.com',
  'GitHub Apps API': 'https://docs.github.com/en/apps',
  Go: 'https://go.dev',
  Grafana: 'https://grafana.com',
  Helm: 'https://helm.sh',
  IndexedDB: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API',
  Kafka: 'https://kafka.apache.org',
  Kubernetes: 'https://kubernetes.io',
  'LLM API': 'https://en.wikipedia.org/wiki/Large_language_model',
  Linux: 'https://www.kernel.org',
  MinIO: 'https://min.io',
  'Node.js': 'https://nodejs.org',
  OpenTelemetry: 'https://opentelemetry.io',
  PHP: 'https://www.php.net',
  Playwright: 'https://playwright.dev',
  PostgreSQL: 'https://www.postgresql.org',
  Prometheus: 'https://prometheus.io',
  Python: 'https://www.python.org',
  React: 'https://react.dev',
  Redis: 'https://redis.io',
  S3: 'https://aws.amazon.com/s3/',
  'Server-sent events': 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events',
  'Tailwind CSS': 'https://tailwindcss.com',
  TypeScript: 'https://www.typescriptlang.org',
  Vitest: 'https://vitest.dev',
  'Web Crypto API': 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API',
  WebRTC: 'https://webrtc.org',
  WebSockets: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
  Yjs: 'https://yjs.dev',
  Zod: 'https://zod.dev',
  coturn: 'https://github.com/coturn/coturn',
  'fast-check': 'https://fast-check.dev',
  gRPC: 'https://grpc.io',
  'hls.js': 'https://github.com/video-dev/hls.js',
  mediasoup: 'https://mediasoup.org',
  pgvector: 'https://github.com/pgvector/pgvector',
};

export const techUrl = (name: string): string | undefined => URLS[ALIASES[name] ?? name];
