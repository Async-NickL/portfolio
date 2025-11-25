import { useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import Lenis from 'lenis';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}>
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '15%',
  scaleEndPosition = '2%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
}) => {
  const scrollerRef = useRef(null);
  const endRef = useRef(null);
  const cardsRef = useRef([]);
  const metricsRef = useRef(null);
  const rafRef = useRef(null);
  const lenisRef = useRef(null);

  const parseValue = (value, total) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * total;
    }
    return parseFloat(value);
  };

  const updateTransforms = useCallback(() => {
    if (!metricsRef.current || !cardsRef.current.length) return;

    const { cards, containerHeight, endTop, scrollContainer } = metricsRef.current;
    const scrollTop = useWindowScroll ? window.scrollY : scrollContainer.scrollTop;

    const stackPositionPx = parseValue(stackPosition, containerHeight);
    const scaleEndPositionPx = parseValue(scaleEndPosition, containerHeight);
    
    // Calculate where the pinning should stop
    // We want to unpin when the end of the section enters the viewport (at the bottom)
    // This ensures the next section doesn't overlap the pinned cards
    const pinEnd = endTop - containerHeight;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const metric = cards[i];
      if (!metric) return;

      const { originalTop } = metric;
      
      // The point where the card hits the stack position
      const pinStart = originalTop - stackPositionPx - (itemStackDistance * i);
      
      let translateY = 0;
      let scale = 1;
      let rotation = 0;
      let blur = 0;

      // Check if we are in the pinning range
      if (scrollTop >= pinStart) {
          if (scrollTop <= pinEnd) {
             // Pinned State
             // We calculate the translation needed to keep the element at the stack position
             // Natural position: originalTop - scrollTop
             // Desired position: stackPositionPx + (itemStackDistance * i)
             // Translation = Desired - Natural
             translateY = (stackPositionPx + (itemStackDistance * i)) - (originalTop - scrollTop);
             
             // Scale Logic
             // We want to scale down as we scroll past the trigger point
             const triggerEnd = originalTop - scaleEndPositionPx;
             // Avoid division by zero
             const range = Math.max(1, triggerEnd - pinStart);
             const progress = Math.min(1, Math.max(0, (scrollTop - pinStart) / range));
             
             const targetScale = baseScale + (i * itemScale);
             // Interpolate between 1 and targetScale
             scale = 1 - (progress * (1 - targetScale));
             
             if (rotationAmount) {
                 rotation = i * rotationAmount * progress;
             }
             
             if (blurAmount) {
                 blur = i * blurAmount * progress;
             }

          } else {
             // Unpinned State (scrolled past)
             // We want it to stay at the bottom of the stack relative to the end marker?
             // Or just scroll away naturally?
             // If we just let it scroll away, we need to apply the final translation
             // corresponding to the pinEnd state.
             
             // At pinEnd, scrollTop = pinEnd.
             // translateY at pinEnd = (stackPositionPx + offset) - (originalTop - pinEnd)
             translateY = (stackPositionPx + (itemStackDistance * i)) - (originalTop - pinEnd);
             
             // Keep final scale
             const targetScale = baseScale + (i * itemScale);
             scale = targetScale;
             
             if (rotationAmount) rotation = i * rotationAmount;
             if (blurAmount) blur = i * blurAmount;
          }
      }

      // Apply transforms efficiently
      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      if (blurAmount) {
          card.style.filter = `blur(${blur}px)`;
      } else {
          card.style.filter = '';
      }
    });

  }, [stackPosition, scaleEndPosition, itemStackDistance, baseScale, itemScale, rotationAmount, blurAmount, useWindowScroll]);

  const measure = useCallback(() => {
    const scroller = useWindowScroll ? document.documentElement : scrollerRef.current;
    if (!scroller) return;

    // Reset styles to get accurate original positions
    cardsRef.current.forEach(card => {
        card.style.transform = '';
        card.style.filter = '';
    });

    const scrollTop = useWindowScroll ? window.scrollY : scrollerRef.current.scrollTop;
    const containerHeight = useWindowScroll ? window.innerHeight : scrollerRef.current.clientHeight;
    
    const endElement = endRef.current;
    const endTop = endElement ? (endElement.getBoundingClientRect().top + scrollTop) : 0;

    const cards = cardsRef.current.map(card => {
        const rect = card.getBoundingClientRect();
        return {
            originalTop: rect.top + scrollTop,
            height: rect.height
        };
    });

    metricsRef.current = {
        cards,
        containerHeight,
        endTop,
        scrollContainer: scroller
    };

    // Re-apply transforms immediately
    updateTransforms();
  }, [useWindowScroll, updateTransforms]);

  useLayoutEffect(() => {
    // Initialize cards
    if (scrollerRef.current) {
        cardsRef.current = Array.from(scrollerRef.current.querySelectorAll('.scroll-stack-card'));
    }

    // Measure initially
    measure();

    // Resize handler
    const handleResize = () => {
        measure();
    };
    window.addEventListener('resize', handleResize);

    // Scroll handler
    const onScroll = () => {
        if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(() => {
                updateTransforms();
                rafRef.current = null;
            });
        }
    };

    if (useWindowScroll) {
        window.addEventListener('scroll', onScroll);
    } else {
        const scroller = scrollerRef.current;
        if (scroller) {
            // Initialize local Lenis if not using window scroll
            const lenis = new Lenis({
                wrapper: scroller,
                content: scroller.querySelector('.scroll-stack-inner'),
                duration: 1.2,
                smoothWheel: true,
                touchMultiplier: 2,
            });
            lenis.on('scroll', onScroll);
            lenisRef.current = lenis;
            
            const raf = (time) => {
                lenis.raf(time);
                requestAnimationFrame(raf);
            };
            requestAnimationFrame(raf);
        }
    }

    return () => {
        window.removeEventListener('resize', handleResize);
        if (useWindowScroll) {
            window.removeEventListener('scroll', onScroll);
        } else {
            lenisRef.current?.destroy();
        }
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [measure, updateTransforms, useWindowScroll]);

  const containerStyles = useWindowScroll
    ? {
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
      }
    : {
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        height: '100vh',
        overflowY: 'auto'
      };

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
      <div className="scroll-stack-inner px-4 md:px-20 pt-[5vh] pb-[10vh] min-h-screen">
        {children}
        <div ref={endRef} className="scroll-stack-end w-full h-px mt-[50vh]" />
      </div>
    </div>
  );
};

export default ScrollStack;
