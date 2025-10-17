import { useEffect, useRef } from "react";

export const useFlyingClone = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      const container = document.createElement("div");
      container.className = "flying-clone-container";
      document.body.appendChild(container);
      containerRef.current = container;
    }
  }, []);

  const flyToTarget = (
    sourceRef: React.RefObject<HTMLElement>,
    targetRef: React.RefObject<HTMLElement>
  ) => {
    if (!sourceRef.current || !targetRef.current || !containerRef.current)
      return;

    const startRect = sourceRef.current.getBoundingClientRect();
    const endRect = targetRef.current.getBoundingClientRect();

    // Clone the element
    const clone = sourceRef.current.cloneNode(true) as HTMLElement;
    clone.classList.add("flying-clone");
    clone.style.position = "fixed";
    clone.style.left = `${startRect.left}px`;
    clone.style.top = `${startRect.top}px`;
    clone.style.width = `${startRect.width}px`;
    clone.style.height = `${startRect.height}px`;
    clone.style.zIndex = "1000";
    clone.style.pointerEvents = "none";

    // Start with no transition, positioned exactly at source
    clone.style.transition = "none";
    clone.style.transform = "translate(0, 0) scale(1)";
    containerRef.current.appendChild(clone);

    // Force reflow so transition works correctly
    clone.getBoundingClientRect();

    requestAnimationFrame(() => {
      // Animate move + scale to target
      clone.style.transition =
        "transform 0.6s ease-in-out, opacity 0.3s ease-in-out";
      const deltaX =
        endRect.left +
        endRect.width / 2 -
        (startRect.left + startRect.width / 2);
      const deltaY =
        endRect.top +
        endRect.height / 2 -
        (startRect.top + startRect.height / 2);
      clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.3,0.2)`;

      setTimeout(() => {
        clone.style.opacity = "0";
      }, 300);

      // After animation ends, fade out and remove
      setTimeout(() => {
        if (clone.parentNode) clone.parentNode.removeChild(clone);
      }, 600);
    });
  };

  const FlyingCloneRenderer = () => null;

  return {
    flyToTarget,
    FlyingCloneRenderer,
  };
};
