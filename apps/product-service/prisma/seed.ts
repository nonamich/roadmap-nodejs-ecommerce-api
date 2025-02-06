import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from 'prisma-client';

const prisma = new PrismaClient();

main();

async function main(): Promise<void> {
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.brand.deleteMany({});
  await prisma.featuredProduct.deleteMany({});

  const categories = await prisma.category.createManyAndReturn({
    data: faker.helpers
      .uniqueArray(faker.commerce.department, 20)
      .map((name) => ({
        name,
        slug: faker.helpers.slugify(name).toLowerCase(),
      })),
  });
  const brands = await prisma.brand.createManyAndReturn({
    data: faker.helpers.uniqueArray(faker.company.name, 30).map((name) => ({
      name,
      slug: faker.helpers.slugify(name).toLowerCase(),
    })),
  });

  const productsData = faker.helpers.multiple<Prisma.ProductCreateManyInput>(
    () => {
      const title = faker.commerce.productName();
      const category = faker.helpers.arrayElement(categories);
      const brand = faker.helpers.arrayElement(brands);
      const randomString = faker.string.alpha({ length: { min: 5, max: 10 } });
      const slug = faker.helpers
        .slugify(`${title}-${randomString}`)
        .toLowerCase();

      return {
        amount: faker.number.int({
          max: 100,
          min: 0,
        }),
        categoryId: category.id,
        brandId: brand.id,
        price: faker.number.float({
          max: 3000,
          min: 10,
          fractionDigits: 3,
        }),
        title,
        slug,
        description: `${faker.commerce.productDescription()}\n${faker.lorem.paragraph({ min: 2, max: 6 })}`,
        rating: faker.number.float({ min: 0, max: 1 }),
        image: faker.image.urlPicsumPhotos({
          width: 1000,
          height: 1000,
          blur: 0,
          grayscale: false,
        }),
        createdAt: faker.date.between({
          from: '2020-01-01T00:00:00.000Z',
          to: new Date(),
        }),
      };
    },
    {
      count: {
        max: 3000,
        min: 2000,
      },
    },
  );

  const ids = await prisma.product.createManyAndReturn({
    data: productsData,
    select: {
      id: true,
    },
  });

  await prisma.featuredProduct.createMany({
    data: faker.helpers.arrayElements(
      ids.map(({ id: productId }) => ({ productId })),
      {
        max: 200,
        min: 50,
      },
    ),
  });
}
