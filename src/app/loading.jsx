"use client";
import React from "react";
import Image from "next/image";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

const Loading = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <section className="mx-auto max-w-xl w-full flex-grow flex flex-col items-center justify-center">
        <aside className="flex items-center justify-center gap-2">
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-sm"></span>
        </aside>
        <Image
          src={`/images/logo.png`}
          alt="logo"
          width={100}
          height={100}
          className="w-[100px] object-cover"
          loading= "lazy"
        />
        <aside className="flex items-center justify-center gap-2">
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-sm"></span>
        </aside>
      </section>
      <Footer />
    </main>
  );
};

export default Loading;
