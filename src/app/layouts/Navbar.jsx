import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // เมื่อเมาส์เลื่อนลง 100 พิกเซล ให้ตั้งค่า isScrolled เป็น true
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // เพิ่มอีเวนต์ลิสเนอร์ในการตรวจจับการ scroll
    window.addEventListener("scroll", handleScroll);

    // นำออกอีเวนต์ลิสเนอร์เมื่อ component fale
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <main>
      <nav className=" flex items-center justify-center max-w-screen-lg mx-auto ">
        <Link
          href={"/saleproducts"}
          className="flex flex-col items-center justify-center bg-white hover:bg-[#ED2024] p-4 duration-[800ms] w-[120px] md:w-[170px] group"
        >
          <div
            className={`w-[40px] h-[40px] md:w-[50px] md:h-[50px] relative `}
          >
            <Image
              src={`/images/sale2.png`}
              alt="sale2"
              width={400}
              height={400}
              className="absolute inset-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-0 duration-[800ms]"
              style={{
                loading: "lazy",
              }}
            />
            <Image
              src={`/images/sale.png`}
              alt="sale"
              width={400}
              height={400}
              className="absolute inset-0 opacity-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-100 duration-[800ms]"
              style={{
                loading: "lazy",
              }}
            />
          </div>
          <p className="font-center text-xs sm:text-sm md:text-lg group-hover:text-white mt-2">
            สินค้า
            <span className="text-red-500 font-center  text-xs sm:text-sm md:text-lg group-hover:text-white">
              ลดราคา
            </span>
          </p>
        </Link>

        <Link
          href={"/newproducts"}
          className="flex flex-col items-center justify-center hover:bg-[#ED2024] p-4 duration-500 w-[120px] md:w-[170px] group"
        >
          <div
            id="icon"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] relative"
          >
            <Image
              src={`/images/new2.png`}
              alt="new2"
              width={400}
              height={400}
              className="absolute inset-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-0 duration-[800ms]"
              style={{
                loading: "lazy",
              }}
            />
            <Image
              src={`/images/new.png`}
              alt="new"
              width={400}
              height={400}
              className="absolute inset-0 opacity-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-100 duration-[800ms]"
              style={{
                loading: "lazy",
              }}
            />
          </div>
          <p className=" font-center text-xs sm:text-sm md:text-lg group-hover:text-white mt-2">
            สินค้า
            <span className="text-red-500 font-center  text-xs sm:text-sm md:text-lg group-hover:text-white">
              ใหม่
            </span>
          </p>
        </Link>

        <Link
          href={"/recomproducts"}
          className="flex flex-col items-center justify-center hover:bg-[#ED2024] p-4 duration-500 w-[120px] md:w-[170px] group"
        >
          <div
            id="icon"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] relative"
          >
            <Image
              src={`/images/recom2.png`}
              alt="recom2"
              width={400}
              height={400}
              className="absolute inset-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-0 duration-[800ms]"
              style={{
                loading: "lazy",
              }}
            />
            <Image
              src={`/images/recom.png`}
              alt="recom"
              width={400}
              height={400}
              className="absolute inset-0 opacity-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-100 duration-[800ms]"
              style={{
                loading: "lazy",
              }}
            />
          </div>
          <p className=" font-center text-xs sm:text-sm md:text-lg group-hover:text-white mt-2">
            สินค้า
            <span className="text-red-500 font-center  text-xs sm:text-sm md:text-lg group-hover:text-white">
              แนะนำ
            </span>
          </p>
        </Link>

        <Link
          href={"/allproducts"}
          className="flex flex-col items-center justify-center hover:bg-[#ED2024] p-4 duration-500 w-[120px] md:w-[170px] group"
        >
          <div
            id="icon"
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] relative"
          >
            <Image
              src={`/images/all2.png`}
              alt="all2"
              width={400}
              height={400}
              className="absolute inset-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-0 duration-[800ms]"
              style={{
                loading: "lazy",
              }}
            />
            <Image
              src={`/images/all.png`}
              alt="all"
              width={400}
              height={400}
              className="absolute inset-0 opacity-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-100 duration-[800ms]"
              style={{
                loading: "lazy",
              }}
            />
          </div>
          <p className=" font-center text-xs sm:text-sm md:text-lg group-hover:text-white mt-2">
            สินค้าทั้งหมด
          </p>
        </Link>
      </nav>
      <section
        className={` ${
          isScrolled
            ? "navbar bg-white justify-center items-center min-h-0 fixed p-0 top-[4rem] hidden md:block z-50"
            : "navbar bg-white justify-center items-center min-h-0 fixed p-0 top-[4rem] hidden z-50"
        }`}
      >
        <div className="flex items-center justify-center">
          <ul className="menu menu-horizontal py-0 gap-14">
            <li>
              <Link href={"/saleproducts"}>
                <p className=" font-center text-xs sm:text-sm md:text-lg group-hover:text-white">
                  สินค้า
                  <span className="text-red-500 font-center  text-xs sm:text-sm md:text-lg group-hover:text-white">
                    ลดราคา
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link href={"/newproducts"}>
                {" "}
                <p className=" font-center text-xs sm:text-sm md:text-lg group-hover:text-white">
                  สินค้า
                  <span className="text-red-500 font-center  text-xs sm:text-sm md:text-lg group-hover:text-white">
                    ใหม่
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link href={"/recomproducts"}>
                {" "}
                <p className=" font-center text-xs sm:text-sm md:text-lg group-hover:text-white">
                  สินค้า
                  <span className="text-red-500 font-center  text-xs sm:text-sm md:text-lg group-hover:text-white">
                    แนะนำ
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link href={"/allproducts"}>
                <p className=" font-center text-xs sm:text-sm md:text-lg group-hover:text-white">
                  สินค้าทั้งหมด
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <button
          onClick={scrollToTop}
          className={` ${
            isScrolled
              ? "btn btn-circle btn-base-300 fixed w-14 h-14 hidden md:flex items-center justify-center bottom-10 right-10 z-50 text-white align-middle bg-red-600 hover:bg-red-500"
              : "hidden"
          }`}
        >
          <svg
            width="100px"
            height="100px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 object-fill object-center"
          >
            <path
              d="M12 5V19M12 5L6 11M12 5L18 11"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </section>
    </main>
  );
};

export default Navbar;
