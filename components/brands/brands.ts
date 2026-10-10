import type { StaticImageData } from "next/image";
import maisonImage from "@/app/images/brands/maison-eclat.png";
import velunaImage from "@/app/images/brands/veluna.png";
import lumeaImage from "@/app/images/brands/lumea.png";
import atelierImage from "@/app/images/brands/atelier-noor.png";
import orielleImage from "@/app/images/brands/orielle.png";
import celesteImage from "@/app/images/brands/celeste.png";

export const DESIGN_BRAND_COUNT_LABEL = "128+ brands";
export const DESIGN_COLUMNS = [["A", "B", "C"], ["D", "E"], ["G", "H"], ["I", "K"], ["J", "M"]];

export type Brand = {
  name: string;
  region: string;
  type: string;
  price: number;
  sustainable: boolean;
  badge?: "New" | "Trending";
  image?: StaticImageData;
  description?: string;
};

export const FEATURED_BRANDS: Brand[] = [
  { name: "Maison Éclat", region: "Europe", type: "Rings", price: 2450, sustainable: true, image: maisonImage, description: "Parisian-inspired fine jewellery for modern milestones." },
  { name: "Veluna", region: "Europe", type: "Necklaces", price: 820, sustainable: true, image: velunaImage, description: "Modern luxury for everyday elegance." },
  { name: "Atelier Noor", region: "Middle East", type: "Rings", price: 2150, sustainable: true, image: atelierImage, description: "Timeless pieces, thoughtfully crafted." },
  { name: "Lumea", region: "Europe", type: "Earrings", price: 1980, sustainable: false, image: lumeaImage, description: "Brilliance for a kinder tomorrow." },
  { name: "Orielle", region: "Europe", type: "Necklaces", price: 980, sustainable: true, image: orielleImage, description: "Meaningful jewellery for every chapter." },
  { name: "Celeste", region: "Europe", type: "Bracelets", price: 3200, sustainable: false, image: celesteImage, description: "Understated luxury, enduring beauty." },
];

const DIRECTORY_GROUPS = [
  ["Atelier Noor", "Aurélie", "Aureva", "Aveline"],
  ["Bellamy", "Blush & Co.", "Borealis", "Byress"],
  ["Celeste", "Célian", "Clover & Stone", "Crystalline"],
  ["D’Orée", "Deauville", "Dima", "Dolcia"],
  ["Éclat Lumière", "Elysian", "Éternité", "Evalis"],
  ["Fiora", "Florelle", "Forande", "Fromé"],
  ["Gemme", "Golden Hour", "Grace & Co.", "Grazia"],
  ["Harmonie", "Harper Fine", "Héloise", "Horizon"],
  ["Ilyra", "Inara", "Isla & Co.", "Ivory Lane"],
  ["Jardin", "Jovia", "Juno"], ["Kaia", "Korelle", "Kuvéra"],
  ["Lumea", "Liora", "Lumière"], ["Maison Éclat", "Maison Lune", "Marella", "Mirelle"],
  ["Nora", "Novelle"], ["Orielle", "Opaline"], ["Perla", "Petale"],
  ["Quartz Atelier"], ["Roselle", "Rêverie"], ["Solenne", "Serene"],
  ["Terra", "Trésor"], ["Una"], ["Veluna", "Vivia"], ["Willow"],
  ["Xara"], ["Yara"], ["Zélie"],
];

export function normalise(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export const BRANDS: Brand[] = DIRECTORY_GROUPS.flat().map((name, index) => {
  const featured = FEATURED_BRANDS.find((brand) => brand.name === name);
  return featured ?? {
    name,
    region: ["Europe", "Middle East", "Asia", "Americas"][index % 4],
    type: ["Rings", "Necklaces", "Earrings", "Bracelets"][index % 4],
    price: [350, 850, 1800, 2800][index % 4],
    sustainable: index % 3 === 0,
    ...(name === "Aureva" || name === "Éternité" ? { badge: "New" as const } : {}),
    ...(name === "Borealis" || name === "Marella" ? { badge: "Trending" as const } : {}),
  };
});