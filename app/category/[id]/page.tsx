import { notFound } from "next/navigation";
import { Metadata } from "next";
import { RING_PRODUCTS } from "@/components/collections/data";
import { ProductDetailView } from "@/components/collections/ProductDetailView";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return RING_PRODUCTS.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = RING_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found | SIDRA",
    };
  }

  return {
    title: `${product.name} — SIDRA Fine Jewellery`,
    description: `Shop ${product.name} crafted in ${product.material}. Ethical diamonds and timeless fine jewellery.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = RING_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
