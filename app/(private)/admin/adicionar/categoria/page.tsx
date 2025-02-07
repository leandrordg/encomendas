import { NewCategoryForm } from "./new-category-form";

export default function NewCategory() {
  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <p className="text-sm uppercase font-semibold tracking-wider">
          Categoria
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          Adicionar categoria
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          Adicione uma nova categoria para possibilitar uma melhor organização
          dos produtos.
        </p>
      </section>

      <section className="max-w-5xl mx-auto p-4">
        <NewCategoryForm />
      </section>
    </main>
  );
}
