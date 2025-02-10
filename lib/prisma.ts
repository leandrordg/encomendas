import ws from "ws";

import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// neonConfig.poolQueryViaFetch = true

declare const globalThis: { prismaGlobal?: PrismaClient } & typeof global;

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = globalThis.prismaGlobal || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export { prisma };
