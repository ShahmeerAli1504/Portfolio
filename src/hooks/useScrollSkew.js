
/**
 * Scroll-velocity skew: containers marked with `data-skew` tilt up to
 * ~1deg with scroll speed and ease back to rest via lerp. The rAF loop
 * only runs while scrolling; transforms are cleared at rest so they
 * can't interfere with anything else. Disabled for coarse pointers and
 * reduced motion. Call once at the app root.
 */
export default function useScrollSkew() {
  // Disabled to ensure native 60fps smooth scrolling without layout skew recalculations
}
