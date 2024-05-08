"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Link from "next/link";
import { DateTime } from "luxon";
import { API_URL, URL_IMAGES } from "../../../../config/constants";
import Header from "@/app/layouts/Header";
import Navbar from "@/app/layouts/Navbar";
import Footer from "@/app/layouts/Footer";

export default function ArticlePage({ params }) {
    const [topics, setTopics] = useState([]);
    const [articles, setArticles] = useState([])


    useEffect(() => {
        loadTopicsTop();
        loadArticles();
        countViews(params.id)
    }, []);

    const loadTopicsTop = async () => {
        await axios
            .get(API_URL + "/topics/" + params.id)
            .then((res) => {
                //console.log(res.data);
                setTopics(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const loadArticles = async () => {
        await axios
            .post(API_URL + "/articlesby", {
                limit: null,
                sort: "createdAt",
                order: "asc",
                id: params.id
            })
            .then((res) => {
                //console.log(res.data);
                setArticles(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const countViews = async (id) => {
        //console.log("topicId", id);

        await axios
            .post(API_URL + "/change-view-topic", { id: id })
            .then((res) => {
                //console.log(res);
            })

            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <main className="flex flex-col min-h-screen bg-gray-200">
            <Header />
            <section className="w-full mx-auto bg-white">
                <Navbar />
            </section>

            <section className="flex-grow max-w-screen-xl mx-auto px-2 w-full">
                <aside className="w-full flex flex-col items-start justify-center bg-white rounded-lg overflow-hidden px-5 md:px-10 py-5 space-y-2 mt-2">
                    <h2 className="text-xl md:text-2xl font-medium">{topics.title}</h2>
                    <div className="flex items-center gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-6 md:h-7 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <time dateTime="2022-10-10" className="block text-sm md:text-[16px] text-gray-500">
                            {DateTime.fromISO(topics.createdAt)
                                .setZone("Asia/Bangkok")
                                .toLocaleString({ locale: "th", day: "2-digit", month: "long", year: "numeric" })}

                        </time>
                    </div>

                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7  text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                        <span className="block text-sm md:text-[16px] text-gray-500">{topics.countView} ครั้ง</span>
                    </div>
                </aside>
                <aside className="w-full flex flex-col items-start justify-center bg-white rounded-lg overflow-hidden px-5 md:px-10 py-5 space-y-2 mt-2">
                    <img
                        src={`${URL_IMAGES}${topics.thumb}`}
                        alt={`${topics.title}`}
                        loading="lazy"
                        className="w-full object-cover rounded-lg"
                    />
                    {articles && articles.map((item, index) => (
                        <article key={index}>
                            <h3 className="text-center text-lg md:text-xl lg:text-2xl font-bold my-7">{item.title}</h3>
                            <div className="" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                            <div className="my-7 w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.images.map((imagesItem, imagesIndex) => (
                                    <img
                                        key={imagesIndex}
                                        src={`${URL_IMAGES}${imagesItem}`}
                                        alt={`${imagesItem}`}
                                        loading="lazy"
                                        className="w-full object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                            <div className="border-t-2 border-gray-300 mx-10 my-2"></div>
                        </article>
                    ))}


                </aside>
            </section>
            <section
                className={`${topics && articles.length === 0 ? "flex-grow mx-auto max-w-screen-xl flex flex-col items-center justify-center" : "hidden"
                    }`}
            >
                <aside className="flex items-center justify-center gap-2">
                    <span className="loading loading-ring loading-sm"></span>
                    <span className="loading loading-ring loading-md"></span>
                    <span className="loading loading-ring loading-lg"></span>
                    <span className="loading loading-ring loading-md"></span>
                    <span className="loading loading-ring loading-sm"></span>
                </aside>
                <p>บทความนี้ยังไม่มีเนื้อหา</p>
                <img
                    src={`/images/logo.png`}
                    alt="logo"
                    className="w-1/12 object-cover"
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
            <Footer />
        </main>
    );
}
