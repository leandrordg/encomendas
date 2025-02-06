import { getReviewsByRestaurant } from "@/hooks/reviews";
import { formatReviews } from "@/lib/utils";
import { StarIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export async function ReviewsDialog({ slug }: { slug: string }) {
  const reviews = await getReviewsByRestaurant(slug);

  // TODO: change this to a render other component
  if (!reviews.length) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-2 cursor-default hover:text-primary transition-all">
          <StarIcon className="size-4 shrink-0" />
          {formatReviews(reviews)}
        </div>
        <Separator orientation="vertical" className="h-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <StarIcon className="size-4 shrink-0" />
              Avaliações de {reviews[0].restaurant?.name}
            </div>
          </DialogTitle>
          <DialogDescription>
            Veja as avaliações de outros clientes sobre o restaurante.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col border rounded-md px-4 py-2"
            >
              <div className="flex items-center gap-1 font-semibold text-sm">
                {review.rating}
                <StarIcon className="size-3 shrink-0" />
                <Separator orientation="vertical" className="w-[1px] h-3" />
                {review.customer.firstName}
              </div>
              <p className="text-xs text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
