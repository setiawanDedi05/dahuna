import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  return NextResponse.json({
    content: [
      {
        _id: "1",
        title: "Woman model",
        link: "/products?caregory=woman-cloth",
        image: "/assets/images/banner-woman-cloth.jpg",
      },
      {
        _id: "2",
        title: "Woman model",
        link: "/products?caregory=woman-cloth",
        image: "/assets/images/banner-woman-cloth-2.jpg",
      },
      {
        _id: "3",
        title: "man model",
        link: "/products?caregory=boy-cloth",
        image: "/assets/images/banner-man-cloth.jpg",
      },
      {
        _id: "4",
        title: "kids",
        link: "/products?caregory=baby-boy-cloth",
        image: "/assets/images/banner-kids-cloth.jpg",
      },
      {
        _id: "6",
        title: "baby",
        link: "/products?caregory=baby-boy-cloth",
        image: "/assets/images/banner-baby-cloth.jpg",
      },
    ],
  });
};
