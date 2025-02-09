import { notFound } from "next/navigation";

import { getProductByUserRestaurant } from "@/hooks/products";

import { Separator } from "@/components/ui/separator";
import { EditProductForm } from "./edit-product-form";

interface Props {
  params: Promise<{ slug: string; productSlug: string }>;
}

export default async function EditProduct({ params }: Props) {
  const { slug, productSlug } = await params;

  const { product } = await getProductByUserRestaurant(slug, productSlug);

  if (!product) return notFound();

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <p className="text-sm uppercase font-semibold tracking-wider">
          Produto
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          {product.name}
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          Veja todos os produtos disponíveis no seu restaurante. Adicione, edite
          e remova produtos a qualquer momento.
        </p>
      </section>

      <Separator className="h-1" />

      <section className="max-w-5xl mx-auto p-4 space-y-6">
        <p className="text-muted-foreground uppercase font-semibold tracking-wider">
          Informações básicas
        </p>

        <EditProductForm product={product} />
      </section>
    </main>
  );
}
