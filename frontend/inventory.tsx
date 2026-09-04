import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { SlideTabs, stockTabs } from "@/components/ui/slide-tabs";
import "./styles.css";

function InventoryTabs() {
  const [category, setCategory] = useState<string>("green");
  useEffect(() => {
    const panel = document.getElementById("stock-catalog");
    if (!panel) return;
    const label = stockTabs.find(tab => tab.id === category)!.label;
    let count = 0;
    panel.querySelectorAll<HTMLElement>("[data-stock-category]").forEach(card => {
      card.hidden = card.dataset.stockCategory !== category;
      if (!card.hidden) count += 1;
    });
    panel.dataset.category = category;
    panel.setAttribute("aria-label", `${label} stock`);
    const title = panel.querySelector("[data-catalog-title]");
    const total = panel.querySelector("[data-catalog-count]");
    const empty = panel.querySelector<HTMLElement>("[data-catalog-empty]");
    if (title) title.textContent = `${label} stock`;
    if (total) total.textContent = `${count} ${count === 1 ? "item" : "items"}`;
    if (empty) {
      empty.hidden = count !== 0;
      empty.textContent = `No ${label.toLowerCase()} in the catalog yet.`;
    }
  }, [category]);
  return <SlideTabs value={category} onValueChange={setCategory} panelId="stock-catalog" />;
}

const root = document.getElementById("inventory-category-tabs");
if (root) createRoot(root).render(<InventoryTabs />);
