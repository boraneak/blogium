import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import 'dotenv/config';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Delete existing data before executing
  await prisma.article.deleteMany({});
  await prisma.user.deleteMany({});

  const users = [];
  for (let i = 0; i < 3; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        password: faker.internet.password(),
      },
    });
    users.push(user);
  }

  const posts = [
    {
      title: 'Getting Started with Prisma',
      body: 'Prisma is a next-generation ORM. It makes database access easy with an auto-generated query builder for TypeScript and Node.js. Prisma helps you write queries in a type-safe way.',
      description: 'An introduction to getting started with Prisma ORM.',
      published: true,
      authorId: users[0].id,
    },
    {
      title: 'Advanced Prisma Techniques',
      body: 'Learn advanced techniques to get the most out of Prisma. From complex queries to database migrations, we cover it all. Take your Prisma skills to the next level.',
      description: 'A deep dive into advanced Prisma techniques.',
      published: true,
      authorId: users[1].id,
    },
    {
      title: 'Prisma and GraphQL',
      body: 'Prisma integrates seamlessly with GraphQL. Learn how to set up Prisma as a GraphQL server. Enhance your GraphQL API with Prisma’s powerful features.',
      description: 'Using Prisma in combination with GraphQL.',
      published: true,
      authorId: users[2].id,
    },
    {
      title: 'Optimizing Prisma Performance',
      body: 'Optimize your Prisma setup for better performance. Learn about indexing, query optimization, and more. Ensure your application runs smoothly and efficiently.',
      description: 'Tips and tricks for optimizing Prisma performance.',
      published: true,
      authorId: users[0].id,
    },
    {
      title: 'Migrating to Prisma',
      body: 'Thinking about migrating to Prisma? This guide covers the migration process in detail. Learn how to move your existing database setup to Prisma without hassle.',
      description: 'A guide to migrating your database to Prisma.',
      published: true,
      authorId: users[1].id,
    },
  ];

  for (const post of posts) {
    await prisma.article.create({ data: post });
  }

  console.log('Database has been seeded with new users and posts.');
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
