'useclient'
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();

    // สร้างวัตถุ URLSearchParams ใหม่และตั้งค่าพารามิเตอร์ `query`
    const searchParams = new URLSearchParams();
    searchParams.set("query", text);

    // ส่ง URL ที่อัปเดตไปยัง `router`
    router.push("/allproducts?" + searchParams.toString());
  };

  return (
    <article className="flex-none">
      {" "}
      <aside className="relative flex items-center w-[130px] md:w-[220px] h-8 sm:pl-6 md:pl-10 border-0 bg-white py-1 rounded-lg">
        <form onSubmit={handleSearch}>
          {" "}
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="search"
            className="input text-xs md:text-sm lg:text-md w-full rounded-md focus:outline-none bg-transparent"
            placeholder="ค้นหา"
          />
          <div
            onClick={handleSearch}
            type="button"
            className="absolute start-1 top-1/2 -translate-y-1/2 rounded-md p-2 transition hover:scale-110 max-sm:hidden cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#D9D9D9]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </form>
      </aside>
    </article>
  );
};

export default Search;
