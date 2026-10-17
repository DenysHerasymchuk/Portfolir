const LOGO_PATH = 'M40 80 H690 L900 290 V734 L690 944 H40 Z M250 290 H685 V734 H250 Z';

// Standalone markup for Copy SVG and Download SVG, with the original grey fill.
export const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <title>Denys Herasymchuk logo</title>
  <path fill="#b0b0b0" fill-rule="evenodd" d="${LOGO_PATH}"/>
</svg>
`;

// Fills with currentColor so it follows the surrounding text colour and theme.
// data-logo hooks it into LogoMenu.
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" aria-hidden="true" data-logo="" className={className}>
      <path fill="currentColor" fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}
