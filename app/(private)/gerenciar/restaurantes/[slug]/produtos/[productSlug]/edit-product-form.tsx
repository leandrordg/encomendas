"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { CheckIcon, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";
import { updateProduct } from "./actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  restaurantId: z.string().min(1, "Campo obrigatório"),
  name: z.string().min(3, "Campo obrigatório"),
  slug: z.optional(z.string()),
  description: z.string().min(20, "Campo obrigatório"),
  imageUrl: z.optional(z.string()),
  price: z
    .string()
    .min(1, "Campo obrigatório")
    .regex(/^\d+(\.\d{1,2})?$/, "Preço inválido"),
});

interface Props {
  product: Product;
}

export function EditProductForm({ product }: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantId: product.restaurantId,
      name: product.name,
      slug: product.slug,
      description: product.description,
      imageUrl: product.imageUrl ?? "/images/placeholder.jpeg",
      price: product.price.toString(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const slug = slugify(values.name, { lower: true });

    const update = await updateProduct({ ...values, slug });

    if (!update) return toast.error("Erro ao atualizar o produto");

    toast.success("Produto atualizado com sucesso");
    return router.back();
  }

  const { isValid, isDirty, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do produto</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Digite o nome do produto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do produto</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  placeholder="Breve descrição do produto"
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled={isSubmitting}
                  placeholder="Digite o preço (ex: 10 ou 10.99)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={() => (
            <FormItem>
              <FormLabel>Imagem (opcional)</FormLabel>
              <FormControl>
                <UploadButton
                  appearance={{
                    container: {
                      alignItems: "start",
                    },
                  }}
                  disabled={isSubmitting}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    form.setValue("imageUrl", res[0].url, {
                      shouldDirty: true,
                    });
                  }}
                  onUploadError={(error: Error) => {
                    console.error("Upload error: ", error);
                  }}
                />
              </FormControl>
              {form.watch("imageUrl") && (
                <div className="aspect-[4/3] relative max-h-96">
                  <Image
                    src={form.watch("imageUrl")!}
                    alt="Imagem do produto"
                    className="rounded-md bg-muted object-cover"
                    fill
                  />
                  <Button
                    type="button"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      form.setValue("imageUrl", "", { shouldDirty: true })
                    }
                  >
                    <TrashIcon />
                    <span className="sr-only">Remover imagem</span>
                  </Button>
                </div>
              )}
              <FormDescription>Recomendado 800x600px (4:3)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
          <CheckIcon />
          Salvar alterações
        </Button>
      </form>
    </Form>
  );
}
