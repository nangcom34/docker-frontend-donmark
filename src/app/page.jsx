"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_URL, URL_IMAGES } from "../../config/constants";
import Header from "./layouts/Header";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

import Link from "next/link";
import ArticlesSlide from "./components/ArticlesSlide";
import { DateTime } from "luxon";

export default function Home() {
  const [topicsTop, setTopicsTop] = useState([]);
  const [topics, setTopics] = useState([]);


  useEffect(() => {
    loadTopicsTop();
    loadTopics();

  }, []);

  const loadTopicsTop = async () => {
    await axios
      .post(API_URL + "/topicsby", {
        limit: 3,
        sort: "countView",
        order: "desc",
      })
      .then((res) => {
        //console.log(res.data);
        setTopicsTop(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadTopics = async () => {
    await axios
      .post(API_URL + "/topicsby", {
        limit: null,
        sort: "createdAt",
        order: "desc",
      })
      .then((res) => {
        //console.log(res.data);
        setTopics(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <section className="flex-grow flex items-center justify-center w-full max-w-screen-xl mx-auto px-3">
        <ArticlesSlide />
      </section>

      <section
        className={`${!topics ? "flex-grow mx-auto max-w-screen-xl flex flex-col items-center justify-center" : "hidden"
          }`}
      >
        <aside className="flex items-center justify-center gap-2">
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-sm"></span>
        </aside>
        <img
          src={`/images/logo.png`}
          alt="logo"
          className="w-[100px] object-cover"
          loading="lazy"
        />
        <aside className="flex items-center justify-center gap-2">
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-sm"></span>
        </aside>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-8 md:gap-y-20 my-10 lg:gap-x-4 max-w-screen-xl mx-auto px-2">
        {topics &&
          topics.map((item, index) => {
            if (item._id !== topicsTop[0]?._id && item._id !== topicsTop[1]?._id && item._id !== topicsTop[2]?._id) {
              return (

                <Link
                  key={index}
                  href={`/article/${item._id}`}
                  className="overflow-hidden rounded-lg shadow transition hover:shadow-lg group"
                >
                  <img
                    src={`${URL_IMAGES}${item.thumb}`}
                    alt={`${item.title}`}
                    className="h-auto w-full object-cover"
                  />

                  <aside className="bg-white p-4 sm:p-6">
                    <h3 className="mt-0.5 text-sm md:text-[16px] text-gray-900 group-hover:text-red-600">{item.title}</h3>

                  </aside>
                  <aside className="w-full pb-3">
                    <div className=" border-b border-gray-500 pb-5 mb-3 mx-5"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full px-3">
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <time dateTime="2022-10-10" className="block text-xs text-gray-500">{DateTime.fromISO(item.createdAt)
                          .setZone("Asia/Bangkok")
                          .toLocaleString({ locale: "th", day: "2-digit", month: "long", year: "numeric" })}</time>
                      </div>

                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                        <span className="block text-xs text-gray-500">{item.countView}</span>
                      </div>


                    </div>


                  </aside>
                </Link>

              );
            }
            return null; // ไม่แสดง item ที่ตรงกับ homepageTop
          })}
      </section>

      <Footer />
    </main>
  );
}
