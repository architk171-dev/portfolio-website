export type DropMonth = {
  label: string;
  dates?: string;
  revenue: number;
  cogs?: number;
  orders?: number;
  adSpend: number;
  profit: number;
  tag?: string;
  note?: string;
  images?: string[];
};

export type DropJourney = {
  storeName: string;
  storeUrl?: string;
  niche: string;
  platform: string;
  period: string;
  status: string;
  summary: string;
  currency: string;
  profitLabel?: string;
  periodNoun?: string;
  showRoas?: boolean;
  months: DropMonth[];
  products?: { name: string; note: string; image?: string }[];
  video?: { src: string; title: string; caption?: string };
  books?: { image: string; caption: string };
  lessons: string[];
};

// Source: the weekly P&L sheet and the one-page audit summary for Vibe Check.
// Profit is EBT. Week 1 profit is recomputed from its own line items because
// the sheet's week-1 gross-margin cell repeats the cost-of-goods figure.
export const dropshipping: DropJourney | null = {
  storeName: "Vibe Check",
  storeUrl: "https://checkvibe.shop/",
  niche: "Gadgets and desk accessories",
  platform: "Online store plus Instagram ads",
  period: "28 Jul to 15 Sep 2025",
  status: "Audited, 8 trading weeks",
  summary:
    "Eight weeks of the Vibe Check P&L, straight from the books. Pick a week to see what came in, what it cost and what was left.",
  currency: "₹",
  profitLabel: "Profit (EBT)",
  periodNoun: "Week",
  months: [
    { label: "W1", dates: "Inception to 28 Jul", revenue: 181586, cogs: 116746, adSpend: 12847, profit: 45273, tag: "Launch", note: "First recorded week. All marketing went through Instagram." },
    { label: "W2", dates: "29 Jul to 4 Aug", revenue: 91259, cogs: 60698, adSpend: 28993, profit: -5994, tag: "Only loss", note: "The only loss-making week: ₹28,993 of Instagram spend against ₹91,259 of revenue." },
    { label: "W3", dates: "5 Aug to 11 Aug", revenue: 269603, cogs: 189490, adSpend: 9063, profit: 65086, note: "Revenue nearly tripled on the week before, with ad spend cut to ₹9,063." },
    { label: "W4", dates: "12 Aug to 18 Aug", revenue: 250153, cogs: 173581, adSpend: 15193, profit: 48838 },
    { label: "W5", dates: "19 Aug to 25 Aug", revenue: 342234, cogs: 234871, adSpend: 20000, profit: 68533 },
    { label: "W6", dates: "26 Aug to 1 Sep", revenue: 450635, cogs: 319168, adSpend: 17000, profit: 92970 },
    { label: "W7", dates: "2 Sep to 8 Sep", revenue: 577564, cogs: 510440, adSpend: 5000, profit: 26875, tag: "Margin dip", note: "Highest revenue yet, but cost of goods took ₹5.1L of ₹5.8L, so gross margin fell to 11.6%, the lowest of the run." },
    { label: "W8", dates: "9 Sep to 15 Sep", revenue: 784209, cogs: 427529, adSpend: 10000, profit: 325682, tag: "Best week", note: "₹7.84L of revenue at a 45.5% gross margin. It made ₹3.26L, almost half the profit of the whole run." },
  ],
  products: [
    { name: "Foldable wireless keyboard", note: "Bluetooth 5.2, folds flat, charges over Type-C.", image: "/dropshipping/keyboard.webp" },
    { name: "Portable projector", note: "Built-in Bluetooth 5.0 for pairing speakers and earphones.", image: "/dropshipping/projector.webp" },
  ],
  video: { src: "/dropshipping/phase-3.mp4", title: "Phase 3" },
  books: { image: "/dropshipping/weekly-sales.webp", caption: "The weekly P&L sheet the numbers above come from." },
  lessons: [],
};
