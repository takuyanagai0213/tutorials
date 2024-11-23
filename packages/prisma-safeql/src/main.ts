import { Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const query = prisma.$queryRaw<User>`SELECT ddd FROM User`;

