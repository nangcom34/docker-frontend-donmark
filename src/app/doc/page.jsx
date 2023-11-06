"use client";
import React from "react";
import Link from "next/link";
import Navbar from "../layouts/Navbar";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

const Doc = () => {
  return (
    <>
      <Header />
      <Navbar />

      <section className="mx-auto max-w-screen-xl w-full overflow-hidden min-h-[70vh] px-14 gap-5 flex flex-col pt-20">
        <Link
          href={"/pdf/ใบอนุญาตก๊อกน้ำ.pdf"}
          target="_blank"
          className="text-lg font-semibold hover:text-red-700 hover:scale-105 hover:translate-x-8 duration-300"
        >
          ใบอนุญาตก๊อกน้ำ
        </Link>
        <Link
          href={"/pdf/ใบอนุญาตก๊อกน้ำเดี่ยวผสม.pdf"}
          target="_blank"
          className="text-lg font-semibold hover:text-red-700 hover:scale-105 hover:translate-x-8 duration-300"
        >
          ใบอนุญาตก๊อกน้ำเดี่ยวผสม
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default Doc;
