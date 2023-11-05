import React from "react";

const PageNotFound = () => {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          ขออภัย !
        </p>

        <p className="mt-4 text-gray-500">ไม่มีหน้าเพจนี้</p>

        <a
          href="/"
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring"
        >
          กลับไปหน้าหลัก
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
