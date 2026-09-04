import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const stockTabs = [
  { id: "green", label: "Green Beans" },
  { id: "roasted", label: "Roasted Beans" },
  { id: "instant_coffee", label: "Instant Coffee" },
  { id: "decoction", label: "Decoction" },
  { id: "herbal_teas", label: "Herbal Teas" },
] as const;

type Tab = { id: string; label: string };
type Props = {
  tabs?: readonly Tab[];
  value?: string;
  onValueChange?: (value: string) => void;
  panelId?: string;
};

// Local DOM refs work for both hover and selection; the supplied callback ref
// cannot be read through ref.current inside a forwarded child.
export function SlideTabs({ tabs = stockTabs, value, onValueChange, panelId }: Props) {
  const [internalValue, setInternalValue] = useState<string>(tabs[0]?.id ?? "");
  const selected = value ?? internalValue;
  const [position, setPosition] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const instanceId = useId();
  const moveTo = useCallback((index: number) => {
    const tab = tabRefs.current[index];
    if (!tab) return;
    setPosition({ left: tab.offsetLeft, top: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight, opacity: 1 });
  }, []);
  const reset = useCallback(() => moveTo(tabs.findIndex(tab => tab.id === selected)), [moveTo, selected, tabs]);

  useEffect(() => {
    reset();
    const observer = new ResizeObserver(reset);
    if (listRef.current) observer.observe(listRef.current);
    tabRefs.current.forEach(tab => { if (tab) observer.observe(tab); });
    return () => observer.disconnect();
  }, [reset]);

  function select(index: number) {
    const tab = tabs[index];
    if (!tab) return;
    setInternalValue(tab.id);
    onValueChange?.(tab.id);
  }

  return (
    <div className="stock-tabs-scroll max-w-full overflow-x-auto">
      <div ref={listRef} role="tablist" aria-label="Stock category" onMouseLeave={reset}
        className="slide-tabs relative isolate mx-auto flex w-fit rounded-full p-1">
        {tabs.map((tab, index) => (
          <button key={tab.id} ref={el => { tabRefs.current[index] = el; }} type="button"
            id={`${instanceId}-${tab.id}`} role="tab" aria-selected={selected === tab.id}
            aria-controls={panelId} tabIndex={selected === tab.id ? 0 : -1}
            onClick={() => select(index)} onMouseEnter={() => moveTo(index)}
            onFocus={() => moveTo(index)} onBlur={reset}
            onKeyDown={event => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
              else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = tabs.length - 1;
              else return;
              event.preventDefault();
              select(next);
              tabRefs.current[next]?.focus();
            }}
            className="slide-tab relative z-10 whitespace-nowrap rounded-full px-3 py-3 text-xs font-semibold sm:px-5 sm:text-sm">
            {tab.label}
          </button>
        ))}
        <motion.span aria-hidden="true" animate={position}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 35 }}
          className="slide-tab-cursor pointer-events-none absolute z-0 rounded-full" />
      </div>
    </div>
  );
}
