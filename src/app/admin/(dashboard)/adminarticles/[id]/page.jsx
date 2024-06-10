"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL, URL_IMAGES } from "../../../../../../config/constants";
import { DateTime } from "luxon";

const AdminArticle = ({ params }) => {
    const [topic, setTopic] = useState([]);
    const [articles, setArticles] = useState([])

    useEffect(() => {
        loadTopics();
        loadArticle()
    }, []);

    const loadTopics = async () => {
        try {
            const response = await axios.get(API_URL + "/topics/" + params.id);
            setTopic(response.data);
            //console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const loadArticle = async () => {
        try {
            const response = await axios.post(API_URL + "/articlesby", {
                id: params.id,
                limit: null,
                sort: "createdAt",
                order: "asc",
            });
            setArticles(response.data);
            //console.log(response.data);
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
                    await axios.delete(API_URL + "/articles/" + id).then((res) => {
                        //console.log(res);
                        loadArticle();
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


    const truncateDescription = (description) => {
        // หาบรรทัดทั้งหมดใน description
        const lines = description.split('<p>');

        // ตัดบรรทัดที่ไม่มีเนื้อหา (ที่มีความยาว 0) ออก
        const filteredLines = lines.filter(line => line.trim().length > 0);

        // เลือกเฉพาะ 4 บรรทัดแรก
        const truncatedLines = filteredLines.slice(0, 4);

        // รวมบรรทัดที่แบ่งแล้วกลับมาเป็นข้อความ
        let truncatedDescription = truncatedLines.join('<p>');

        // เพิ่ม ... ต่อท้ายข้อความ
        if (filteredLines.length > 4) {
            truncatedDescription += '...';
        }

        return truncatedDescription;
    }


    return (

        <main className="w-full">
            <section className="w-full flex items-center justify-end">
                <Link
                    href={`/admin/adminarticles`}

                    className="btn btn-outline btn-sm text-xs sm:text-sm md:text-md xl:text-lg bg-red-600 border-0 text-white hover:shadow-gray-500 duration-300 shadow-lg shadow-red-600/40 w-[7rem] my-2 mx-2"
                >
                    ย้อนกลับ
                </Link>
            </section>

            <section className="w-full my-5 ">
                <p className="text-lg lg:text-xl text-center font-bold w-full px-10 text-red-600">{topic.title}</p>
            </section>
            <section className="flex items-center justify-center flex-wrap mx-auto gap-x-5 gap-y-2 w-full">
                <Link
                    href={`/admin/addarticles/${params.id}`}

                    className="btn btn-sm sm:btn-md text-xs sm:text-sm md:text-md bg-indigo-600 border-0 text-white hover:text-black duration-300 shadow-lg shadow-indigo-600/40 max-w-[12rem] w-full "
                >
                    เพิ่มรายละเอียดบทความ
                </Link>

            </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 px-5 mt-5 mb-10 w-full">
                {articles &&
                    articles?.map((item, index) => (
                        <article
                            key={index}
                            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 w-full bg-white"
                        >
                            <span
                                className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-orange-400 via-red-500 to-red-600"
                            ></span>
                            <span
                                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-orange-400 via-red-500 to-red-600"
                            ></span>

                            <aside className="flex-col-reverse flex sm:flex-row items-center justify-between">
                                <dl className="flex gap-4 sm:gap-6">
                                    <div className="flex flex-col">
                                        <dt className="text-sm  text-center font-medium text-gray-600">วันที่เขียน</dt>
                                        <dd className="text-xs text-center text-gray-500">{DateTime.fromISO(item.createdAt)
                                            .setZone("Asia/Bangkok")
                                            .toLocaleString({ locale: "th", day: "2-digit", month: "long", year: "numeric" })}</dd>
                                    </div>

                                    <div className="flex flex-col">
                                        <dt className="text-sm text-center font-medium text-gray-600">อัพเดท</dt>
                                        <dd className="text-xs text-center text-gray-500">{DateTime.fromISO(item.updatedAt)
                                            .setZone("Asia/Bangkok")
                                            .toRelative({ locale: "th" })}</dd>
                                    </div>
                                </dl>
                                <div className="whitespace-nowrap px-4 py-2 z-40">
                                    <Link
                                        href={`/admin/editarticles/${item._id}`}
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

                            <aside className="mt-5 flex flex-col items-start justify-center sm:gap-4 w-full">
                                <div className="flex items-center justify-center gap-3 w-full">
                                    {item.images.map((imagesItem, imagesIndex) => (
                                        <div key={imagesIndex} className="shadow-md rounded-lg w-16 md:w-28 overflow-hidden">
                                            <img
                                                alt={imagesItem}
                                                src={`${URL_IMAGES}${imagesItem}`}
                                                className="w-16 md:w-28 object-center object-cover"
                                            />
                                        </div>
                                    ))}

                                </div>
                                <div>
                                    <p className="mt-1 text-xs font-medium text-gray-600">บทความที่ {index + 1}
                                    </p>
                                    <h3 className="text-[16px] md:text-lg text-gray-900 md:text-md">
                                        หัวข้อย่อย : <span className="text-[16px] md:text-lg font-semibold">{item.title}</span>
                                    </h3>


                                </div>
                                <div dangerouslySetInnerHTML={{ __html: truncateDescription(item.description) }}></div>
                                {/* <div>
                                    <p className="mt-1 text-xs font-medium text-gray-600 px-5">
                                        {item.description
                                            .split("\n" || "\r\n")
                                            .slice(0, 5)
                                            .map((line, index) => (
                                                <React.Fragment key={index}>
                                                    {line}
                                                    {index === 4 ? "..." : <br />}
                                                </React.Fragment>
                                            ))}
                                    </p>


                                </div> */}

                            </aside>


                        </article>
                    ))}

            </section>

        </main>

    );
};

export default AdminArticle;
