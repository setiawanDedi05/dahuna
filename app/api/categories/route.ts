import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  return NextResponse.json({
    content: [
      {
        _id: "1",
        title: "Woman Cloth",
        link: "/products?caregory=woman-cloth",
        image: "/assets/images/woman-cloth.jpg",
      },
      {
        _id: "2",
        title: "Man Cloth",
        link: "/products?caregory=man-cloth",
        image: "/assets/images/man-cloth.jpg",
      },
      {
        _id: "3",
        title: "Boy Cloth",
        link: "/products?caregory=boy-cloth",
        image: "/assets/images/boy-cloth.jpg",
      },
      {
        _id: "3",
        title: "Girl Cloth",
        link: "/products?caregory=girl-cloth",
        image: "/assets/images/girl-cloth.jpg",
      },
      {
        _id: "4",
        title: "Baby Cloth",
        link: "/products?caregory=baby-boy-cloth",
        image: "/assets/images/baby-cloth.jpg",
      },
    ],
  });
};
