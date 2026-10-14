"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import ring1 from "@/app/images/ring1.png";
import ring2 from "@/app/images/ring2.png";
import ring3 from "@/app/images/ring3.png";
import ring4 from "@/app/images/ring4.png";
import ring5 from "@/app/images/ring5.png";
import ring6 from "@/app/images/ring6.png";
import diamondsImg from "@/app/images/diamonds.png";
import gemstonesImg from "@/app/images/gemstones.png";

export type ProductItem = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: any;
  category?: "Rings" | "Necklaces" | "Earrings" | "Bracelets" | string;
  metal?: string;
  carat?: string;
  brand?: string;
  rating?: number;
  reviewsCount?: number;
  stockStatus?: "in_stock" | "low_stock" | "price_dropped";
  stockText?: string;
};

export type CartItem = ProductItem & {
  quantity: number;
  selectedSize?: string;
  selectedMaterial?: string;
};

export type ToastInfo = {
  id: string;
  title: string;
  message: string;
  type: "bag" | "wishlist";
  image?: any;
};

type CartWishlistContextType = {
  wishlist: ProductItem[];
  cart: CartItem[];
  addToWishlist: (item: ProductItem) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (item: ProductItem) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  addToCart: (item: ProductItem, qty?: number, size?: string, material?: string) => void;
  removeFromCart: (id: string) => void;
  updateCartQty: (id: string, qty: number) => void;
  clearCart: () => void;
  moveAllWishlistToBag: () => void;
  cartCount: number;
  wishlistCount: number;
  toast: ToastInfo | null;
  dismissToast: () => void;
};

const INITIAL_WISHLIST_ITEMS: ProductItem[] = [
  {
    id: "wl-1",
    name: "Solitaire Diamond Ring",
    price: 1250,
    image: ring1,
    category: "Rings",
    metal: "18K Gold",
    carat: "0.70 ct",
    brand: "Lumière",
    rating: 5,
    reviewsCount: 128,
    stockStatus: "in_stock",
    stockText: "In Stock",
  },
  {
    id: "wl-2",
    name: "Malachite Clover Necklace",
    price: 980,
    image: gemstonesImg,
    category: "Necklaces",
    metal: "18K Gold",
    carat: "Natural Gem",
    brand: "Lumea",
    rating: 5,
    reviewsCount: 64,
    stockStatus: "low_stock",
    stockText: "Only 2 left",
  },
  {
    id: "wl-3",
    name: "Gold Hoop Earrings",
    price: 1420,
    image: ring3,
    category: "Earrings",
    metal: "18K Gold",
    brand: "Vélofa",
    rating: 5,
    reviewsCount: 89,
    stockStatus: "in_stock",
    stockText: "In Stock",
  },
  {
    id: "wl-4",
    name: "Classic Tennis Bracelet",
    price: 2300,
    image: ring4,
    category: "Bracelets",
    metal: "18K Gold",
    carat: "2.0 ct",
    brand: "Maison Lumière",
    rating: 5,
    reviewsCount: 73,
    stockStatus: "in_stock",
    stockText: "In Stock",
  },
  {
    id: "wl-5",
    name: "Heart Diamond Pendant",
    price: 860,
    image: diamondsImg,
    category: "Necklaces",
    metal: "18K Gold",
    brand: "Éclat",
    rating: 5,
    reviewsCount: 51,
    stockStatus: "in_stock",
    stockText: "In Stock",
  },
  {
    id: "wl-6",
    name: "Emerald Statement Ring",
    price: 1980,
    image: ring2,
    category: "Rings",
    metal: "18K Gold",
    carat: "2.5 ct",
    brand: "Royal Gem",
    rating: 5,
    reviewsCount: 40,
    stockStatus: "price_dropped",
    stockText: "Price dropped",
  },
  {
    id: "wl-7",
    name: "Pearl Drop Earrings",
    price: 720,
    image: ring5,
    category: "Earrings",
    metal: "18K Gold",
    brand: "Lune Atelier",
    rating: 5,
    reviewsCount: 67,
    stockStatus: "in_stock",
    stockText: "In Stock",
  },
  {
    id: "wl-8",
    name: "Stackable Ring Set",
    price: 1150,
    image: ring6,
    category: "Rings",
    metal: "18K Gold",
    brand: "Nora Fine Jewellery",
    rating: 5,
    reviewsCount: 92,
    stockStatus: "low_stock",
    stockText: "Only 3 left",
  },
];

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined);

export function CartWishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<ProductItem[]>(INITIAL_WISHLIST_ITEMS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (title: string, message: string, type: "bag" | "wishlist", image?: any) => {
    setToast({
      id: String(Date.now()),
      title,
      message,
      type,
      image,
    });
  };

  const dismissToast = () => setToast(null);

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id);
  };

  const addToWishlist = (item: ProductItem) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev;
      return [item, ...prev];
    });
    showToast(item.name, "Added to your Wishlist", "wishlist", item.image);
  };

  const removeFromWishlist = (id: string) => {
    const item = wishlist.find((p) => p.id === id);
    setWishlist((prev) => prev.filter((p) => p.id !== id));
    showToast(item ? item.name : "Item", "Removed from your Wishlist", "wishlist", item?.image);
  };

  const toggleWishlist = (item: ProductItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const clearWishlist = () => setWishlist([]);

  const addToCart = (item: ProductItem, qty = 1, size?: string, material?: string) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + qty } : p
        );
      }
      return [
        ...prev,
        {
          ...item,
          quantity: qty,
          selectedSize: size || "7",
          selectedMaterial: material || item.metal || "18K Rose Gold",
        },
      ];
    });
    showToast(item.name, `Added to your Shopping Bag (${qty})`, "bag", item.image);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateCartQty = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  };

  const clearCart = () => setCart([]);

  const moveAllWishlistToBag = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((item) => {
      addToCart(item, 1);
    });
    showToast("All Items", `Moved ${wishlist.length} items to Shopping Bag`, "bag");
  };

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const wishlistCount = wishlist.length;

  return (
    <CartWishlistContext.Provider
      value={{
        wishlist,
        cart,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        moveAllWishlistToBag,
        cartCount,
        wishlistCount,
        toast,
        dismissToast,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}

export function useCartWishlist() {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error("useCartWishlist must be used within a CartWishlistProvider");
  }
  return context;
}
