import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const shortLink1 = await prisma.shortLink.upsert({
    where: { alias: 'benchmark' },
    update: {},
    create: {
      url: 'https://www.prisma.io/docs/reference/api-reference/prisma-client-reference',
      alias: 'benchmark',
      published: true,
    },
  });

  const shortLink2 = await prisma.shortLink.upsert({
    where: { alias: 'underdog' },
    update: {},
    create: {
      url: 'https://github.com/codeazq',
      alias: 'underdog',
      published: true,
    },
  });

  console.log({ shortLink1, shortLink2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
