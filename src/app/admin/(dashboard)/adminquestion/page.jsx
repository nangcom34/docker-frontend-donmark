"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL, URL_IMAGES } from "../../../../../config/constants";
import { DateTime } from "luxon";

const AdminQuestion = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!localStorage.donmarktoken) {
      router.push("/login");
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.post(API_URL + "/questionby", {
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
          await axios.delete(API_URL + "/question/" + id).then((res) => {
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
  const itemsPerPage = 10;
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
        <p className="text-2xl font-bold w-full px-10">คำถามที่พบบ่อย</p>
      </section>
      
      <section className="flex flex-col justify-start px-5">
        <Link
          href={"/admin/addquestion"}
          className="btn btn-accent mx-auto mt-4 mb-5 shadow-md max-w-[15rem] w-full border-2 border-b-green-400"
        >
          เพิ่มคำถาม
        </Link>

        <div className="overflow-x-auto mt-3 rounded-xl bg-clip-border shadow-md">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="">
              <tr>
                
                <th className="whitespace-nowrap text-left px-4 py-2 text-gray-500 text-sm sm:text-[15px] font-bold">
                  คำถาม
                </th>
                <th className="whitespace-nowrap text-left px-4 py-2 text-gray-500 text-sm sm:text-[15px] font-bold">
                  คำตอบ
                </th>

                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {currentItems &&
                currentItems?.map((item) => (
                  <tr key={item._id}>
                    
                    <td className="whitespace-nowrap px-4 py-2 text-xs sm:text-[15px] max-w-[15rem] overflow-auto break-all">
                      {item.question}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-xs sm:text-[15px] max-w-[20rem] w-full overflow-auto break-all">
                      {item.answer}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2">
                      <Link
                        href={`/admin/editquestion/${item._id}`}
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
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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

export default AdminQuestion;
