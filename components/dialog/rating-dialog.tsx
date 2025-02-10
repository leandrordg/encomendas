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
  const { restaurant, reviews } = await getReviewsByRestaurant(slug);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 cursor-default hover:text-primary transition-all">
          <StarIcon className="size-4 shrink-0" />
          {formatReviews(reviews)}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              Avaliações de {restaurant.name} ({reviews.length})
            </div>
          </DialogTitle>
          <DialogDescription>
            Veja o que os clientes estão falando sobre este restaurante.
          </DialogDescription>
        </DialogHeader>

        {reviews.length > 0 ? (
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
                  {review.customer.name}
                </div>
                <p className="text-xs text-muted-foreground">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Ainda não há avaliações para este restaurante.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
