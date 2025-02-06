import Link from "next/link";

import { getAddressesByRestaurant } from "@/hooks/addresses";
import { MapPinIcon, PhoneIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export async function AddressDialog({ slug }: { slug: string }) {
  const addresses = await getAddressesByRestaurant(slug);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 rounded-md border px-2 py-1 cursor-default hover:bg-muted">
          <MapPinIcon className="size-4 shrink-0" />
          {addresses[0].street}, - {addresses[0].city}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <MapPinIcon className="size-4 shrink-0" />
              Endereços de {addresses[0].restaurant.name}
            </div>
          </DialogTitle>
          <DialogDescription>
            Veja os endereços disponíveis para entrega e retirada.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="flex flex-col gap-2 text-sm text-muted-foreground px-4 py-2 rounded-md border"
            >
              {/* TODO: Add name for address, like: Main Store */}
              <Link
                href={`https://www.google.com/maps/search/?q=${encodeURIComponent(`${address.street}, ${address.city}`)}`}
                target="_blank"
                className="flex items-center gap-2"
              >
                <MapPinIcon className="size-4 shrink-0" />
                {address.street}, - {address.city}
              </Link>

              <Link
                href={`tel:${address.phoneNumber?.number}`}
                className="flex items-center gap-2"
              >
                <PhoneIcon className="size-4 shrink-0" />
                {address.phoneNumber?.number}
              </Link>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
