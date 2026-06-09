// Overlay scanlines CRT global, statique et très subtil (signature "arcade").
// Décoratif et purement visuel : aucun coût JS, n'altère pas la lisibilité.
export function CRTOverlay() {
  return <div className="crt-overlay" aria-hidden />;
}
