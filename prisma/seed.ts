import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "woman-cloth" },
      update: {},
      create: {
        title: "woman cloth",
        slug: "woman-cloth",
        image: "/assets/images/woman-1.jpg",
      },
    }),
    prisma.category.upsert({
      where: { slug: "man-cloth" },
      update: {},
      create: {
        title: "man cloth",
        slug: "man-cloth",
        image: "/assets/images/man-cloth.jpg",
      },
    }),
    prisma.category.upsert({
      where: { slug: "boy-cloth" },
      update: {},
      create: {
        title: "boy cloth",
        slug: "boy-cloth",
        image: "/assets/images/boy-cloth.jpg",
      },
    }),
    prisma.category.upsert({
      where: { slug: "girl-cloth" },
      update: {},
      create: {
        title: "girl cloth",
        slug: "girl-cloth",
        image: "/assets/images/girl-cloth.jpg",
      },
    }),
    prisma.category.upsert({
      where: { slug: "baby-cloth" },
      update: {},
      create: {
        title: "baby cloth",
        slug: "baby-cloth",
        image: "/assets/images/baby-cloth.jpg",
      },
    }),
  ]);

  await Promise.all([
    prisma.slide.upsert({
      where: { slug: "woman-model" },
      update: {},
      create: {
        title: "woman model",
        slug: "woman-model",
        image: "/assets/images/woman-1.jpg",
      },
    }),
    prisma.slide.upsert({
      where: { slug: "woman-model-2" },
      update: {},
      create: {
        title: "woman model 2",
        slug: "woman-model-2",
        image: "/assets/images/banner-woman-cloth-2.jpg",
      },
    }),
    prisma.slide.upsert({
      where: { slug: "man-model" },
      update: {},
      create: {
        title: "man model",
        slug: "man-model",
        image: "/assets/images/banner-man-cloth.jpg",
      },
    }),
    prisma.slide.upsert({
      where: { slug: "kids-model" },
      update: {},
      create: {
        title: "kids model",
        slug: "kids-model",
        image: "/assets/images/banner-kids-cloth.jpg",
      },
    }),
    prisma.slide.upsert({
      where: { slug: "baby-model" },
      update: {},
      create: {
        title: "baby model",
        slug: "baby-model",
        image: "/assets/images/banner-baby-cloth.jpg",
      },
    }),
  ]);

  const product = await Promise.all([
    prisma.product.upsert({
      where: { slug: "et-inventore-quod" },
      update: {},
      create: {
        slug: "et-inventore-quod",
        name: "et inventore quod",
        description:
          "Quam possimus voluptatem amet omnis est consequatur est. Quibusdam voluptas nostrum minus repellat veniam eos eius. Expedita ut ipsa harum magni aut et est. Voluptas quos vitae. Et praesentium optio qui est quo ipsam maiores.",
        categoryId: categories[0].id,
        priceDisplay: 400000,
        priceReal: 450000,
        weight: "1",
      },
    }),
    prisma.product.upsert({
      where: { slug: "excepturi-ut-odit" },
      update: {},
      create: {
        slug: "excepturi-ut-odit",
        name: "excepturi ut odit",
        description:
          "Autem explicabo dolor reiciendis. Et aut minima qui unde voluptas. Hic rerum aut rem aspernatur soluta. Odio quasi maxime deleniti est. Et sunt nesciunt voluptatem illo deleniti reprehenderit. Sit qui aliquid deleniti et.",
        categoryId: categories[1].id,
        priceDisplay: 350000,
        priceReal: 400000,
        weight: "1",
      },
    }),
    prisma.product.upsert({
      where: { slug: "doloremque-omnis-laboriosam" },
      update: {},
      create: {
        slug: "doloremque-omnis-laboriosam",
        name: "doloremque omnis laboriosam",
        description:
          "Aut id numquam. Molestias distinctio mollitia et unde omnis rerum. Nesciunt voluptatum voluptatem exercitationem quas voluptas dignissimos maiores.",
        categoryId: categories[2].id,
        priceDisplay: 300000,
        priceReal: 350000,
        weight: "1",
      },
    }),
    prisma.product.upsert({
      where: { slug: "deleniti-vero-natus" },
      update: {},
      create: {
        slug: "deleniti-vero-natus",
        name: "deleniti vero natus",
        description:
          "Nihil debitis similique et et ipsum. Alias voluptatem et culpa illum possimus magnam ex dolorem. Non eligendi beatae assumenda qui explicabo vel id placeat. Tenetur ab cupiditate iste molestiae expedita quibusdam quas temporibus corporis.",
        categoryId: categories[3].id,
        priceDisplay: 500000,
        priceReal: 550000,
        weight: "1",
      },
    }),
    prisma.product.upsert({
      where: { slug: "voluptate-aliquam-odit" },
      update: {},
      create: {
        slug: "voluptate-aliquam-odit",
        name: "voluptate aliquam odit",
        description:
          "Perspiciatis quo quo iure. Hic fugit voluptatem magni facere sed minima laboriosam et. Ut veniam et ut quis ipsa non architecto fuga voluptatibus.",
        categoryId: categories[3].id,
        priceDisplay: 100000,
        priceReal: 150000,
        weight: "1",
      },
    }),
  ]);

  await Promise.all([
    prisma.productImage.upsert({
      where: { url: "/assets/images/image-1.jpg" },
      update: {
        productId: product[0].id,
      },
      create: {
        url: "/assets/images/image-1.jpg",
        productId: product[0].id,
      },
    }),
    prisma.productImage.upsert({
      where: { url: "/assets/images/image-2.jpg" },
      update: {
        productId: product[1].id,
      },
      create: {
        url: "/assets/images/image-2.jpg",
        productId: product[1].id,
      },
    }),
    prisma.productImage.upsert({
      where: { url: "/assets/images/image-3.jpg" },
      update: {
        productId: product[3].id,
      },
      create: {
        url: "/assets/images/image-3.jpg",
        productId: product[2].id,
      },
    }),
    prisma.productImage.upsert({
      where: { url: "/assets/images/image-4.jpg" },
      update: {
        productId: product[3].id,
      },
      create: {
        url: "/assets/images/image-4.jpg",
        productId: product[3].id,
      },
    }),
    prisma.productImage.upsert({
      where: { url: "/assets/images/image-5.jpg" },
      update: {
        productId: product[4].id,
      },
      create: {
        url: "/assets/images/image-5.jpg",
        productId: product[4].id,
      },
    }),
    prisma.voucher.upsert({
      where: { code: "DEDI12" },
      update: {},
      create: {
        code: "DEDI12",
        amount: 10000,
      },
    }),
  ]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
