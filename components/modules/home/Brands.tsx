import Image from "next/image";
import React from "react";

export const Brands = () => {
  const logos = [
    {
      src: "/assets/logo/aero-street.png",
      alt: "aero-street",
    },
    {
      src: "/assets/logo/brodo.png",
      alt: "brodo",
    },
    {
      src: "/assets/logo/geoffmax.png",
      alt: "geoff-max",
    },
    {
      src: "/assets/logo/heiden-heritage.png",
      alt: "heiden-heritage",
    },
    {
      src: "/assets/logo/patrobas.png",
      alt: "patrobas",
    },
    {
      src: "/assets/logo/pijakbumi.avif",
      alt: "pijakbumi",
    },
    {
      src: "/assets/logo/geoffmax.png",
      alt: "geoff-max",
    },
    {
      src: "/assets/logo/heiden-heritage.png",
      alt: "heiden-heritage",
    },
  ];
  return (
    <section className="py-8 flex flex-col justify-center items-center">
      <h2 className="text-center text-2xl mb-2 font-bold leading-8">Brands</h2>
      <p className="text-center text-lg font-extralight leading-8 ">
        Soluta deleniti eum dolores voluptas optio.
      </p>

      <div className="my-20 inline-flex w-[80%] flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8">
          {logos.map((logo, index) => (
            <li key={index}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={100}
                className="!size-20 md:!size-24"
              />
            </li>
          ))}
        </ul>
        <ul
          className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8"
          aria-hidden="true"
        >
          {logos.map((logo, index) => (
            <li key={index}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={100}
                className="!size-20 md:!size-24"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
