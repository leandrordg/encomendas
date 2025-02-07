import { AdminCategoryCard } from "@/components/admin-category-card";
import { getCategories } from "@/hooks/categories";
import { InfoIcon } from "lucide-react";

export default async function Admin() {
  const { latestCategories } = await getCategories();

  return (
    <main className="py-10 md:py-14 lg:py-20 space-y-8">
      <section className="max-w-5xl mx-auto p-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
          Administração
        </h1>

        <p className="text-muted-foreground leading-relaxed mt-6">
          Visão geral de todas as funcionalidades administrativas. Adicione,
          edite ou remova usuários, produtos, categorias e restaurantes.
        </p>
      </section>

      <section className="max-w-5xl mx-auto p-4 space-y-8">
        {latestCategories.length === 0 && (
          <div className="flex sm:items-center gap-4 p-6 border rounded-md mt-14 text-sm text-muted-foreground">
            <InfoIcon className="size-4 shrink-0" />
            Não encontramos restaurantes nesta categoria.
          </div>
        )}

        {latestCategories.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
              Categorias
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {latestCategories.map((category) => (
                <AdminCategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
            Restaurantes
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mt-6"></div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
            Usuários
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mt-6"></div>
        </div>
      </section>
    </main>
  );
}
