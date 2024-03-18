import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname()

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
  //console.log(pathname)
  return (
    <main className="w-full">
      <nav className=" flex items-center justify-center max-w-screen-lg mx-auto ">
        <Link
          href={"/"}
          className={`${pathname === '/' ? 'bg-red-500 bg-opacity-30' : 'bg-white'} flex flex-col items-center justify-center hover:bg-[#ED2024] p-4 duration-[800ms] w-auto sm:w-[120px] md:w-[170px] group `}
        >
          <div
            className={`w-[30px] h-[30px] md:w-[50px] md:h-[50px] relative `}
          >
            <img
              src={`/images/homepage2.png`}
              alt="homepage2"
              className="absolute inset-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-0 duration-[800ms]"
              loading="lazy"
            />
            <img
              src={`/images/homepage.png`}
              alt="homepage"
              className="absolute inset-0 opacity-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-100 duration-[800ms]"
              loading="lazy"
            />
          </div>
          <p className="text-center text-xs sm:text-sm md:text-lg group-hover:text-white mt-2">
            ข่าวสาร
          </p>
        </Link>

        <Link
          href={"/saleproducts"}
          className={`flex flex-col items-center justify-center  hover:bg-[#ED2024] p-4 duration-[800ms] w-auto sm:w-[120px] md:w-[170px] group ${pathname === '/saleproducts' ? 'bg-red-500 bg-opacity-30' : 'bg-white'}`}
        >
          <div
            className={`w-[30px] h-[30px] md:w-[50px] md:h-[50px] relative `}
          >
            <img
              src={`/images/sale2.png`}
              alt="sale2"
              className="absolute inset-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-0 duration-[800ms]"
              loading="lazy"
            />
            <img
              src={`/images/sale.png`}
              alt="sale"
              
              className="absolute inset-0 opacity-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-100 duration-[800ms]"
              loading="lazy"
            />
          </div>
          <p className="text-center text-xs sm:text-sm md:text-lg group-hover:text-white mt-2">
            สินค้า
            <span className="text-red-500 text-center  text-xs sm:text-sm md:text-lg group-hover:text-white">
              ลดราคา
            </span>
          </p>
        </Link>

        <Link
          href={"/newproducts"}
          className={`flex flex-col items-center justify-center  hover:bg-[#ED2024] p-4 duration-[800ms] w-auto sm:w-[120px] md:w-[170px] group ${pathname === "/newproducts" ? "bg-red-500 bg-opacity-30" : "bg-white"}`}
        >
          <div
            id="icon"
            className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] relative"
          >
            <img
              src={`/images/new2.png`}
              alt="new2"
              
              className="absolute inset-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-0 duration-[800ms]"
              loading="lazy"
            />
            <img
              src={`/images/new.png`}
              alt="new"
              
              className="absolute inset-0 opacity-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-100 duration-[800ms]"
              loading="lazy"
            />
          </div>
          <p className=" text-center text-xs sm:text-sm md:text-lg group-hover:text-white mt-2">
            สินค้า
            <span className="text-red-500 text-center  text-xs sm:text-sm md:text-lg group-hover:text-white">
              ใหม่
            </span>
          </p>
        </Link>

        <Link
          href={"/recomproducts"}
          className={`flex flex-col items-center justify-center  hover:bg-[#ED2024] p-4 duration-[800ms] w-auto sm:w-[120px] md:w-[170px] group ${pathname === "/recomproducts" ? "bg-red-500 bg-opacity-30" : "bg-white"}`}
        >
          <div
            id="icon"
            className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] relative"
          >
            <img
              src={`/images/recom2.png`}
              alt="recom2"
              
              className="absolute inset-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-0 duration-[800ms]"
              loading="lazy"
            />
            <img
              src={`/images/recom.png`}
              alt="recom"
              
              className="absolute inset-0 opacity-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-100 duration-[800ms]"
              loading="lazy"
            />
          </div>
          <p className=" text-center text-xs sm:text-sm md:text-lg group-hover:text-white mt-2">
            สินค้า
            <span className="text-red-500 text-center  text-xs sm:text-sm md:text-lg group-hover:text-white">
              แนะนำ
            </span>
          </p>
        </Link>

        <Link
          href={"/allproducts"}
          className={`flex flex-col items-center justify-center  hover:bg-[#ED2024] p-4 duration-[800ms] w-auto sm:w-[120px] md:w-[170px] group ${pathname === "/allproducts" ? "bg-red-500 bg-opacity-30" : "bg-white"}`}
        >
          <div
            id="icon"
            className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] relative"
          >
            <img
              src={`/images/all2.png`}
              alt="all2"
              
              className="absolute inset-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-0 duration-[800ms]"
              loading="lazy"
            />
            <img
              src={`/images/all.png`}
              alt="all"
              
              className="absolute inset-0 opacity-0 w-full h-auto object-fill object-center rounded-2xl group-hover:opacity-100 duration-[800ms]"
              loading="lazy"
            />
          </div>
          <p className=" text-center text-xs sm:text-sm md:text-lg group-hover:text-white mt-2">
            สินค้าทั้งหมด
          </p>
        </Link>
      </nav>
      <article
        className={` ${isScrolled
          ? "navbar bg-white justify-center items-center min-h-0 fixed py-0 top-0 sm:top-[4rem] md:top-[4.2rem] hidden sm:flex z-50 w-full min-w-[100vw] shadow-sm"
          : " hidden "
          }`}
      >
        <div className="flex items-center justify-center max-w-screen-lg">
          <ul className="menu menu-horizontal flex items-center justify-center flex-nowrap">
            <li>
              <Link href={"/"} className={`w-auto sm:w-[120px] md:w-[150px] lg:w-[170px] flex item-center justify-center flex-nowrap hover:bg-red-600 rounded-t-md group ${pathname === '/' ? 'bg-red-500 bg-opacity-30' : ''}`}>
                <p className="text-center text-xs sm:text-sm md:text-lg group-hover:text-white">
                  ข่าวสาร
                </p>
              </Link>
            </li>
            <li>
              <Link href={"/saleproducts"} className={`w-auto sm:w-[120px] md:w-[150px] lg:w-[170px] flex item-center justify-center flex-nowrap hover:bg-red-600 rounded-t-md group ${pathname === '/saleproducts' ? 'bg-red-500 bg-opacity-30' : ''}`}>
                <p className="text-center text-xs sm:text-sm md:text-lg group-hover:text-white">
                  สินค้า
                  <span className="text-red-500 text-center  text-xs sm:text-sm md:text-lg group-hover:text-white">
                    ลดราคา
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link href={"/newproducts"} className={`w-auto sm:w-[120px] md:w-[150px] lg:w-[170px] flex item-center justify-center flex-nowrap hover:bg-red-600 rounded-t-md group ${pathname === '/newproducts' ? 'bg-red-500 bg-opacity-30' : ''}`}>
                {" "}
                <p className="text-center text-xs sm:text-sm md:text-lg group-hover:text-white">
                  สินค้า
                  <span className="text-red-500 text-center  text-xs sm:text-sm md:text-lg group-hover:text-white">
                    ใหม่
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link href={"/recomproducts"} className={`w-auto sm:w-[120px] md:w-[150px] lg:w-[170px] flex item-center justify-center flex-nowrap hover:bg-red-600 rounded-t-md group ${pathname === '/recomproducts' ? 'bg-red-500 bg-opacity-30' : ''}`}>
                {" "}
                <p className="text-center text-xs sm:text-sm md:text-lg group-hover:text-white">
                  สินค้า
                  <span className="text-red-500 text-center  text-xs sm:text-sm md:text-lg group-hover:text-white">
                    แนะนำ
                  </span>
                </p>
              </Link>
            </li>
            <li >
              <Link href={"/allproducts"} className={`w-auto sm:w-[120px] md:w-[150px] lg:w-[170px] flex item-center justify-center flex-nowrap hover:bg-red-600 rounded-t-md group ${pathname === '/allproducts' ? 'bg-red-500 bg-opacity-30' : ''}`}>
                <p className="text-center text-xs sm:text-sm md:text-lg group-hover:text-white">
                  สินค้าทั้งหมด
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </article>

      <section>
        <button
          onClick={scrollToTop}
          className={` ${isScrolled
            ? "btn btn-circle btn-base-300 fixed w-14 h-14 hidden sm:flex items-center justify-center bottom-44 right-10 z-50 text-white align-middle bg-red-600 hover:bg-red-500"
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
