import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/data";
import { getCatalogueProductBySlug } from "@/lib/catalogue";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  // Mock and Medusa share the same slugs, so the mock list is fine for paths.
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name.en,
    description: product.description.en,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = (await getCatalogueProductBySlug(slug)) ?? getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
