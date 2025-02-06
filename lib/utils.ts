import { Product, Review } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatAveragePrice(products: Product[] | undefined) {
  const price =
    products?.length &&
    products.reduce((acc, product) => acc + product.price, 0) / products.length;

  if (!price) return "Grátis";

  return "$".repeat(Math.ceil(price / 20));
}

export function formatReviews(reviews: Review[] | undefined) {
  if (!reviews?.length) return "Sem avaliações";

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const reviewsFormatted = reviews.length > 1 ? "avaliações" : "avaliação";

  return `${averageRating.toFixed(1)} (${reviews.length} ${reviewsFormatted})`;
}
