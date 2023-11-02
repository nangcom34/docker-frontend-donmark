import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <main>
      <nav className=" flex items-center justify-center max-w-screen-lg mx-auto max-sm:hidden">
        <Link
          href={"/"}
          className="flex flex-col items-center justify-center hover:bg-[#D9D9D9] p-4 duration-500 w-[120px] md:w-[170px]"
        >
          <div className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]">
            {" "}
            <Image
              src={`/images/sale.jpg`}
              alt="sale"
              width={400}
              height={400}
              className="w-full h-auto object-fill object-center rounded-2xl"
              style={{
                loading: "lazy",
              }}
            />
          </div>

          <p className="mt-1 font-center  text-xs sm:text-sm md:text-lg">
            สินค้า{" "}
            <span className="text-red-500 font-center  text-xs sm:text-sm md:text-lg">
              ลดราคา
            </span>
          </p>
        </Link>

        <Link
          href={"/newproducts"}
          className="flex flex-col items-center justify-center hover:bg-[#D9D9D9] p-4 duration-500 w-[120px] md:w-[170px]"
        >
          <div className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]">
            {" "}
            <Image
              src={`/images/new.jpg`}
              alt="new"
              width={400}
              height={400}
              className="w-full h-auto object-fill object-center rounded-2xl"
              style={{
                loading: "lazy",
              }}
            />
          </div>

          <p className="mt-1 font-center  text-xs sm:text-sm md:text-lg">
            สินค้า{" "}
            <span className="text-red-500 font-center  text-xs sm:text-sm md:text-lg">
              ใหม่
            </span>
          </p>
        </Link>

        <Link
          href={"/recomproducts"}
          className="flex flex-col items-center justify-center hover:bg-[#D9D9D9] p-4 duration-500 w-[120px] md:w-[170px]"
        >
          <div className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]">
            {" "}
            <Image
              src={`/images/recom.jpg`}
              alt="recom"
              width={400}
              height={400}
              className="w-full h-auto object-fill object-center rounded-2xl"
              style={{
                loading: "lazy",
              }}
            />
          </div>

          <p className="mt-1 font-center  text-xs sm:text-sm md:text-lg">
            สินค้า{" "}
            <span className="text-red-500 font-center  text-xs sm:text-sm md:text-lg">
              แนะนำ
            </span>
          </p>
        </Link>

        <Link
          href={"/allproducts"}
          className="flex flex-col items-center justify-center hover:bg-[#D9D9D9] p-4 duration-500 w-[120px] md:w-[170px]"
        >
          <div className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]">
            {" "}
            <Image
              src={`/images/all.jpg`}
              alt="all"
              width={400}
              height={400}
              className="w-full h-auto object-fill object-center rounded-2xl"
              style={{
                loading: "lazy",
              }}
            />
          </div>

          <p className="mt-1 font-center  text-xs sm:text-sm md:text-lg">
            สินค้าทั้งหมด
          </p>
        </Link>
      </nav>
    </main>
  );
};

export default Navbar;
