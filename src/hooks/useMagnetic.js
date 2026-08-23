/**
 * Magnetic hover: elements matching `selector` are gently pulled toward
 * the pointer (capped at `max` px). Delegated on document so elements
 * mounted later (filters, show-more) work automatically. The pull rides
 * the existing CSS `transform` transition on the element. Disabled for
 * coarse pointers and reduced motion. Call once at the app root.
 */
export default function useMagnetic() {
  // Disabled to eliminate mousemove layout recalculations and rendering overhead
}
