import Image from "next/image";

import { User } from "@prisma/client";

interface Props {
  user: User;
}

export function AdminUserCard({ user }: Props) {
  return (
    <div className="p-4 rounded-md border hover:bg-muted transition-all">
      <div className="flex gap-4">
        <div className="relative size-10 rounded-full overflow-clip shrink-0">
          <Image
            src={user.imageUrl}
            alt={user.firstName}
            className="w-full h-full object-cover bg-muted"
            fill
          />
        </div>

        <div>
          <h3 className="text-sm md:text-base font-bold text-balance">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground break-all line-clamp-1">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}
