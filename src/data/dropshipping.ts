export type DropMonth = {
  label: string;
  revenue: number;
  orders: number;
  adSpend: number;
  profit: number;
  tag?: string;
  note?: string;
  images?: string[];
};

export type DropJourney = {
  storeName: string;
  niche: string;
  platform: string;
  period: string;
  status: string;
  summary: string;
  currency: string;
  months: DropMonth[];
  products?: { name: string; note: string }[];
  lessons: string[];
};

// Fill this in with real numbers to publish the widget. While it is null
// the whole section renders nothing.
export const dropshipping: DropJourney | null = null;
