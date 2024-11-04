import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  return NextResponse.json({
    content: [
      {
        _id: "1",
        title: "Woman Cloth",
        category: "1",
        images: ["/assets/images/woman-1.jpg"],
        price: "200000"
      },
      {
        _id: "2",
        title: "Man Cloth",
        category: "2",
        images: ["/assets/images/man-cloth.jpg"],
        price: "300000"
      },
      {
        _id: "3",
        title: "Boy Cloth",
        link: "3",
        images: ["/assets/images/boy-cloth.jpg"],
        price: "400000"
      }
    ],
  });
};
