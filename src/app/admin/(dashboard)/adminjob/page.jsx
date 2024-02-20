"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL, URL_IMAGES } from "../../../../../config/constants";
import { DateTime } from "luxon";
import JobCard from "@/app/components/JobCard";

const AdminJob = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!localStorage.donmarktoken) {
      router.push("/login");
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.post(API_URL + "/jobby", {
        limit: null,
        sort: "createdAt",
        order: "desc",
      });
      setData(response.data);
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
          await axios.delete(API_URL + "/job/" + id).then((res) => {
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
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      className={`inline-block w-8 h-8 text-center leading-8 ${
        number === currentPage
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-900"
      } rounded border border-gray-100 cursor-pointer`}
      onClick={() => setCurrentPage(number)}
    >
      {number}
    </li>
  ));

  return (
    <main>
      <section className="pt-10">
        {" "}
        <p className="text-2xl font-bold w-full px-10">รายการรับสมัครงาน</p>
      </section>
      <section className="flex flex-col justify-start px-5">
        <Link
          href={"/admin/addjob"}
          className="btn btn-accent  mx-auto mt-4 mb-5 shadow-md max-w-[15rem] w-full border-2 border-b-green-400"
        >
          เพิ่ม
        </Link>
        {currentItems &&
          currentItems?.map((item) => (
            <aside
              key={item._id}
              className="w-full duration-500 flex items-center justify-center mb-2"
            >
              <div className="w-full p-2 max-w-[950px] h-auto relative rounded-[10px] border border-red-600 flex items-center justify-start overflow-auto py-5 bg-white">
                <div
                  onClick={() => {
                    document.getElementById(`my_modal_${item._id}`).showModal();
                  }}
                  className="w-[30%] max-md:hidden flex items-center justify-center mx-5 cursor-pointer"
                >
                  <Image
                    src={`/images/job.png`}
                    alt={item.name}
                    width={188}
                    height={188}
                    className="w-full object-fill"
                    loading= "lazy"
                  />
                </div>
                <div className="flex flex-col flex-wrap justify-center md:mr-5 overflow-auto w-full">
                  <div
                    onClick={() => {
                      document
                        .getElementById(`my_modal_${item._id}`)
                        .showModal();
                    }}
                    className="flex flex-wrap items-center justify-between cursor-pointer"
                  >
                    <p className=" text-neutral-700 text-base font-semibold">
                      {item.name}
                    </p>
                    <p className="text-right text-neutral-700 text-base font-semibold ">
                      {DateTime.fromISO(item.createdAt)
                        .setZone("Asia/Bangkok")
                        .toRelative({ locale: "th" })}
                    </p>
                  </div>
                  <p
                    onClick={() => {
                      document
                        .getElementById(`my_modal_${item._id}`)
                        .showModal();
                    }}
                    className="  text-neutral-700 text-sm font-semibold mb-1 cursor-pointer"
                  >
                    ตำแหน่ง : {item.position}
                  </p>
                  <p
                    onClick={() => {
                      document
                        .getElementById(`my_modal_${item._id}`)
                        .showModal();
                    }}
                    className="  text-neutral-700 text-[13px] font-normal mb-3 hidden sm:block cursor-pointer"
                  >
                    {item.responsibilities
                      .split("\n" || "\r\n")
                      .slice(0, 3)
                      .map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          {index === 2 ? "..." : <br />}
                        </React.Fragment>
                      ))}
                  </p>
                  <div className="flex items-center justify-between">
                    <div
                      onClick={() => {
                        document
                          .getElementById(`my_modal_${item._id}`)
                          .showModal();
                      }}
                      className="flex flex-col justify-center cursor-pointer"
                    >
                      <p className="  text-neutral-700 text-[13px] font-semibold mb-1">
                        เงินเดือน(บาท) : {item.salary}
                      </p>
                      <p className="  text-neutral-700 text-[13px] font-semibold mb-1">
                        {item.location}
                      </p>
                    </div>
                    <div className="whitespace-nowrap px-4 py-2">
                      <Link
                        href={`/admin/editjob/${item._id}`}
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
                  </div>
                </div>
              </div>
              <dialog id={`my_modal_${item._id}`} className="modal m-auto">
                <div className="modal-box p-0 relative max-w-screen-xl overflow-hidden flex">
                  <JobCard data={item} />
                  
                </div>
              </dialog>
            </aside>
          ))}

        {/* <div className="whitespace-nowrap px-4 py-2 text-xs sm:text-[15px] truncate hover:text-clip max-w-xs overflow-auto break-all text-center">
                      {DateTime.fromISO(item.createdAt)
                        .setZone("Asia/Bangkok")
                        .toRelative({ locale: "th" })}
                    </div>

                    <div className="whitespace-nowrap px-4 py-2">
                      <Link
                        href={`/admin/editjob/${item._id}`}
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
                    </div> */}
        <ol className="flex justify-center gap-1 text-xs font-medium ax-auto mt-1">
          <li>
            <a
              href="#"
              className={`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
                currentPage === 1 ? "cursor-not-allowed" : ""
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

          {renderPageNumbers}

          <li>
            <a
              href="#"
              className={`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
                currentPage === Math.ceil(data.length / itemsPerPage)
                  ? "cursor-not-allowed"
                  : ""
              }`}
              onClick={() => {
                if (currentPage < Math.ceil(data.length / itemsPerPage)) {
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
        </ol>
      </section>
    </main>
  );
};

export default AdminJob;
