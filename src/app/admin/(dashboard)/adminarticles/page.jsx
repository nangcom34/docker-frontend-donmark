"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { DateTime } from "luxon";
import { API_URL, URL_IMAGES } from "../../../../../config/constants";

const AdminArticles = () => {
    const [topics, setTopics] = useState([]);
    const [articles, setArticles] = useState([])

    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {
        try {
            const loadTopics = await axios.post(API_URL + "/topicsby", {
                limit: null,
                sort: "createdAt",
                order: "desc",
            });
            setTopics(loadTopics.data);

            const loadArticles = await axios.get(API_URL + "/articles");
            setArticles(loadArticles.data);
            //console.log(loadArticles.data);

            // นับจำนวนบทความของแต่ละหัวข้อ
            const topicsWithArticleCount = await loadTopics.data.map(topic => {
                const articleCount = loadArticles.data.filter(article => article.topics?._id === topic._id).length;
                return { ...topic, articleCount };
            });
            setTopics(topicsWithArticleCount);

        } catch (error) {
            console.log(error);
        }
    };


    const handleDelete = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-error mr-2",
            },
            buttonsStyling: false,
        });

        // ตรวจสอบว่ามี subCategory ที่เชื่อมโยงกับหมวดหมู่หลักหรือไม่
        const hasRelatedArticles = articles.some(articlesItem => articlesItem.topics?._id === id);

        if (hasRelatedArticles) {
            swalWithBootstrapButtons.fire(
                "ล้มเหลว!",
                "ไม่สามารถลบหมวดหมู่ได้เนื่องจากมีหมวดหมู่ย่อยที่เชื่อมโยงอยู่",
                "error"
            );
            return;
        }

        swalWithBootstrapButtons
            .fire({
                title: "แจ้งเตือน!!",
                text: "คุณต้องการที่จะลบข้อมูลหรือไม่?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "ต้องการลบ!!",
                cancelButtonText: "ไม่ต้องการลบ!",
                reverseButtons: true,
            })
            .then(async (res) => {
                if (res.isConfirmed) {
                    swalWithBootstrapButtons.fire("สำเร็จ!", "ลบข้อมูลสำเร็จ", "success");
                    await axios.delete(API_URL + "/topics/" + id).then((res) => {
                        //console.log(res);
                        loadData();
                    });
                } else if (res.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "ล้มเหลว!",
                        "ลบข้อมูลไม่สำเร็จ",
                        "error"
                    );
                }
            });
    };



    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = topics.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(topics.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    const renderPageNumbers = () => {
        let pageNumberList = [];

        // แสดงหมายเลขหน้าตามเงื่อนไข
        if (pageNumbers.length <= 5) {
            pageNumberList = pageNumbers;
        } else if (currentPage <= 3) {
            pageNumberList = [1, 2, 3, 4, 5, '...', pageNumbers.length];
        } else if (currentPage >= pageNumbers.length - 2) {
            pageNumberList = [1, '...', pageNumbers.length - 4, pageNumbers.length - 3, pageNumbers.length - 2, pageNumbers.length - 1, pageNumbers.length];
        } else {
            pageNumberList = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageNumbers.length];
        }

        return pageNumberList.map((number, index) => (
            <li
                key={index}
                className={`block w-8 h-8 text-center leading-8 ${number === currentPage ? "bg-red-600 text-white" : "bg-white text-gray-900"
                    } rounded border border-gray-100 cursor-pointer`}
                onClick={() => {
                    if (number !== '...') {
                        setCurrentPage(number);
                    }
                }}
            >
                {number}
            </li>
        ));
    };

    return (
        <main>
            <section className="flex flex-col justify-start px-5 overflow-hidden">
                <p className="text-xl font-bold text-red-600 sm:text-2xl mt-5">
                    บทความ
                </p>
                <Link
                    href={"/admin/addtopics"}
                    className="btn btn-sm sm:btn-md text-xs sm:text-sm md:text-md xl:text-lg bg-indigo-600 border-0 text-white hover:text-black duration-300 shadow-lg shadow-indigo-600/40 max-w-[12rem] w-full mx-auto my-5"
                >
                    เพิ่มหัวข้อบทความ
                </Link>

                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-5 mt-5 mb-24 relative">
                    {currentItems &&
                        currentItems?.map((item, index) => (
                            <section
                                key={index}
                                className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 w-full bg-white hover:scale-105 duration-500 group"
                            >
                                <span
                                    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-orange-400 via-red-500 to-red-600"
                                ></span>

                                <Link
                                    href={`/admin/adminarticles/${item._id}`}
                                    className="flex justify-between gap-4 w-full hover:underline">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 md:text-md">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-xs font-medium text-gray-600">
                                            อ่าน {item.countView} ครั้ง
                                        </p>
                                        <p className="mt-1 text-xs font-medium text-gray-600">
                                            จำนวนบทความ {item.articleCount}
                                        </p>
                                    </div>

                                    <div className="hidden sm:block shrink-0 shadow-md rounded-lg w-16 md:w-28 overflow-hidden">
                                        <img
                                            alt={item.title}
                                            src={`${URL_IMAGES}${item.thumb}`}
                                            className="w-16 md:w-28 object-center object-cover"
                                        />
                                    </div>
                                </Link>
                                <aside className="mt-6 flex flex-wrap items-center justify-around">
                                    <div className="flex gap-4 sm:gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm  text-center font-medium text-gray-600">วันที่เขียน</span>
                                            <span className="text-xs text-center text-gray-500">{DateTime.fromISO(item.createdAt)
                                                .setZone("Asia/Bangkok")
                                                .toLocaleString({ locale: "th", day: "2-digit", month: "long", year: "numeric" })}</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-sm text-center font-medium text-gray-600">อัพเดท</span>
                                            <span className="text-xs text-center text-gray-500">{DateTime.fromISO(item.updatedAt)
                                                .setZone("Asia/Bangkok")
                                                .toRelative({ locale: "th" })}</span>
                                        </div>
                                    </div>
                                    <div className="whitespace-nowrap px-4 py-2 z-40">
                                        <Link
                                            href={`/admin/edittopics/${item._id}`}
                                            className="btn btn-outline btn-primary btn-sm m-1"
                                        >
                                            แก้ไข
                                        </Link>
                                        <button
                                            className="btn btn-outline btn-error btn-sm"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            ลบ
                                        </button>
                                    </div>
                                </aside>

                            </section>
                        ))}
                    {
                        topics && topics.length > 0
                            ?
                        (<section className={`${pageNumbers && pageNumbers.length <= 1 ? "hidden" : "flex items-center justify-center absolute -bottom-14 right-1/2 translate-x-1/2"}`}>
                                <ul className="flex justify-center gap-1 text-xs font-medium mx-auto mt-1">
                                    <li>
                                        <a
                                            href="#"
                                            className={`flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 ${currentPage === 1 ? "cursor-not-allowed" : ""
                                                }`}
                                            onClick={() => {
                                                if (currentPage > 1) {
                                                    setCurrentPage(currentPage - 1);
                                                }
                                            }}
                                        >
                                            <span className="sr-only">Prev Page</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </li>

                                    {renderPageNumbers()}

                                    <li>
                                        <a
                                            href="#"
                                            className={`flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 ${currentPage === Math.ceil(topics.length / itemsPerPage)
                                                ? "cursor-not-allowed"
                                                : ""
                                                }`}
                                            onClick={() => {
                                                if (currentPage < Math.ceil(topics.length / itemsPerPage)) {
                                                    setCurrentPage(currentPage + 1);
                                                }
                                            }}
                                        >
                                            <span className="sr-only">Next Page</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </section>)
                            : null
                    }

                </section>

            </section>
        </main>
    );
};

export default AdminArticles;
