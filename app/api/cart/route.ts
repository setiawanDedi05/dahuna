import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  return NextResponse.json({
    content: [
      {
        _id: "1",
        productId: "1",
        userId: "user_2o8tPZAoDUlWR0Z7jzDqRZf34Fr",
        quantity: 2,
        price: 300000,
        product: {
          _id: "1",
          title: "Natus sed voluptatem.",
          category: "1",
          description: "Et ex aut.",
          images: ["/assets/images/image-1.jpg", "/assets/images/image-2.jpg"],
          real_price: "200000",
          price: "300000",
        },
        user: {
          firstName: "Dedi Setiawan",
        },
      },
      {
        _id: "2",
        productId: "2",
        userId: "user_2o8tPZAoDUlWR0Z7jzDqRZf34Fr",
        quantity: 1,
        price: 300000,
        product: {
          _id: "2",
          title: "Ducimus consequatur reiciendis.",
          category: "2",
          description: "Aut et doloremque",
          images: ["/assets/images/image-2.jpg", "/assets/images/image-1.jpg"],
          real_price: "350000",
          price: "300000",
        },
        user: {
          firstName: "Dedi Setiawan",
        },
      },
      {
        _id: "3",
        productId: "3",
        userId: "user_2o8tPZAoDUlWR0Z7jzDqRZf34Fr",
        quantity: 1,
        price: 400000,
        product: {
          _id: "3",
          title: "Sed expedita aut facere ut.",
          link: "3",
          description: "Qui et delectus est sequi cumque.",
          images: ["/assets/images/image-3.jpg", "/assets/images/image-4.jpg"],
          real_price: "450000",
          price: "400000",
        },
        user: {
          firstName: "Dedi Setiawan",
        },
      },
    ],
  });
};
