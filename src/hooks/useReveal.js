import { useEffect } from 'react';

/**
 * Adds `.visible` to every `.reveal` element as it scrolls into view.
 * A MutationObserver watches for elements mounted later (filter changes,
 * show-more, hot reloads), so nothing can ever stay stuck at opacity 0.
 * Call once at the app root.
 */
export default function useReveal(deps = []) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll('.reveal:not(.visible)')
        .forEach((el) => el.classList.add('visible'));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    const observeElements = (root = document) => {
      root
        .querySelectorAll('.reveal:not(.visible)')
        .forEach((el) => io.observe(el));
    };

    observeElements();

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.matches && node.matches('.reveal:not(.visible)')) {
              io.observe(node);
            }
            if (node.querySelectorAll) {
              observeElements(node);
            }
          }
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
