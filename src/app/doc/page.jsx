"use client";
import React from "react";
import Link from "next/link";
import Navbar from "../layouts/Navbar";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

const Doc = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Navbar />

      <section className="flex-grow mx-auto max-w-screen-xl w-full overflow-hidden px-14 gap-5 flex flex-col pt-20">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-xl">เอกสารรับรอง</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover">
                <th className="text-lg">1</th>
                <td>
                  {" "}
                  <Link
                    href={"/pdf/ใบอนุญาตก๊อกน้ำ.pdf"}
                    target="_blank"
                    className="text-lg hover:text-red-700 hover:scale-105 hover:translate-x-8 duration-300"
                  >
                    ใบอนุญาตก๊อกน้ำ
                  </Link>
                </td>
              </tr>
              {/* row 2 */}
              <tr className="hover">
                <th className="text-lg">2</th>
                <td>
                  {" "}
                  <Link
                    href={"/pdf/ใบอนุญาตก๊อกน้ำเดี่ยวผสม.pdf"}
                    target="_blank"
                    className="text-lg hover:text-red-700 hover:scale-105 hover:translate-x-8 duration-300"
                  >
                    ใบอนุญาตก๊อกน้ำเดี่ยวผสม
                  </Link>
                </td>
              </tr>
              <tr className="hover">
                
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Doc;
