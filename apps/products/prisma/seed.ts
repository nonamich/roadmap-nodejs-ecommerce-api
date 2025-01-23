import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

main();

async function main() {
  await prisma.category.deleteMany({});
  await prisma.brand.deleteMany({});
  await prisma.product.deleteMany({});

  const currencies = ["EUR", "USD", "GBP"];
  const categories = await prisma.category.createManyAndReturn({
    data: faker.helpers
      .uniqueArray(faker.commerce.department, 20)
      .map((name) => ({ name })),
  });
  const brands = await prisma.brand.createManyAndReturn({
    data: faker.helpers
      .uniqueArray(faker.company.name, 30)
      .map((name) => ({ name })),
  });

  const productsData = faker.helpers.multiple(
    () => {
      return {
        amount: faker.number.int({
          max: 100,
          min: 0,
        }),
        categoryId: faker.helpers.arrayElement(categories).id,
        currency: faker.helpers.arrayElement(currencies),
        brandId: faker.helpers.arrayElement(brands).id,
        price: faker.number.int({
          max: 100_000,
          min: 10,
        }),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        rating: faker.number.float({ min: 0, max: 1 }),
        image: faker.image.url({ width: 1000, height: 1000 }),
        createdAt: faker.date.between({
          from: "2020-01-01T00:00:00.000Z",
          to: new Date(),
        }),
      };
    },
    {
      count: {
        max: 3000,
        min: 2000,
      },
    }
  );

  await prisma.product.createMany({ data: productsData });
}
