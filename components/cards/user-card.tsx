import Image from "next/image";

import { User } from "@prisma/client";

interface Props {
  user: User;
}

export function UserCard({ user }: Props) {
  return (
    <div className="p-4 rounded-md border hover:bg-muted transition-all">
      <div className="flex gap-4">
        <div className="relative size-10 rounded-full overflow-clip shrink-0">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || user.email}
              className="w-full h-full object-cover bg-muted"
              fill
            />
          ) : (
            <Image
              src="/images/placeholder.jpeg"
              alt={user.name || user.email}
              className="w-full h-full object-cover bg-muted"
              fill
            />
          )}
        </div>

        <div>
          {user.name && (
            <h3 className="text-sm md:text-base font-bold text-balance">
              {user.name}
            </h3>
          )}
          <p className="text-xs md:text-sm text-muted-foreground break-all line-clamp-1">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}
