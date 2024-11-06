import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return NextResponse.json({
    content: [
      {
        _id: "1",
        title: "Natus sed voluptatem.",
        category: "1",
        description: "Et ex aut.",
        images: ["/assets/images/image-1.jpg", "/assets/images/image-2.jpg"],
        real_price: "200000",
        price: "150000",
      },
      {
        _id: "2",
        title: "Ducimus consequatur reiciendis.",
        category: "2",
        description: "Aut et doloremque",
        images: ["/assets/images/image-2.jpg", "/assets/images/image-1.jpg"],
        real_price: "350000",
        price: "300000",
      },
      {
        _id: "3",
        title: "Sed expedita aut facere ut.",
        link: "3",
        description: "Qui et delectus est sequi cumque.",
        images: ["/assets/images/image-3.jpg", "/assets/images/image-4.jpg"],
        real_price: "450000",
        price: "400000",
      },
      {
        _id: "4",
        title: "Maxime tenetur accusamus qui autem.",
        category: "2",
        description: "Doloremque dolorum neque quibusdam",
        images: ["/assets/images/image-4.jpg", "/assets/images/image-3.jpg"],
        real_price: "350000",
        price: "300000",
      },
      {
        _id: "5",
        title: "Minima deserunt nam illum incidunt dolorum.",
        link: "3",
        description: "Architecto eos eos est laudantium qui.",
        images: ["/assets/images/image-5.jpg", "/assets/images/image-3.jpg"],
        real_price: "450000",
        price: "400000",
      },
    ],
  });
};
