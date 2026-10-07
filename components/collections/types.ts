export type FilterState = {
  categories: string[];
  materials: string[];
  gemstones: string[];
  styles: string[];
  sizes: number[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  readyToShipOnly: boolean;
};

export const INITIAL_FILTERS: FilterState = {
  categories: [],
  materials: [],
  gemstones: [],
  styles: [],
  sizes: [],
  minPrice: 0,
  maxPrice: 5000,
  inStockOnly: false,
  readyToShipOnly: false,
};

export type SortOption = "relevance" | "price-asc" | "price-desc" | "newest";
