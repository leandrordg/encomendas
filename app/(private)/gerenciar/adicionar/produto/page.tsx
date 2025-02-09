import { getRestaurantsByUser } from "@/hooks/restaurants";

import { NewProductForm } from "./new-product-form";

export default async function NewProduct() {
  const { restaurants } = await getRestaurantsByUser();

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <p className="text-sm uppercase font-semibold tracking-wider">
          Produtos
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          Adicionar produto
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          Adicione um novo produto ao seu cardápio. Escolha o restaurante e
          preencha os campos abaixo.
        </p>
      </section>

      <section className="max-w-5xl mx-auto p-4">
        <NewProductForm restaurants={restaurants} />
      </section>
    </main>
  );
}
