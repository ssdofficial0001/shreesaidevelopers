import { useEffect } from 'react';

/**
 * Initializes IntersectionObserver to reveal elements with the .reveal-on-scroll class
 * as they enter the viewport, matching luxury spatial animations.
 */
export function useScrollReveal(dependencyTrigger?: unknown) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve after animating in to keep DOM performant
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
      elements.forEach((el) => observer.observe(el));
    };

    // Initial pass
    observeElements();

    // Re-check after short tick to catch dynamic rendering (e.g. properties fetched)
    const timer = setTimeout(observeElements, 400);

    // Mutation observer to observe dynamically injected elements
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [dependencyTrigger]);
}
