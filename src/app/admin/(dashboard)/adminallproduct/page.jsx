"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL, URL_IMAGES } from "../../../../../config/constants";
import { DateTime } from "luxon";

const AdminAllProduct = () => {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (!localStorage.donmarktoken) {
      router.push("/login");
    }
    loadData();
    loadCategory();
  }, []);

  const loadData = async () => {
    try {
      let filters = { limit: null, sort: "createdAt", order: "desc" };
      const response = await axios.post(API_URL + "/productby", { filters });
      setData(response.data);
      setDataFilter(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCategory = async () => {
    try {
      const response = await axios.get(API_URL + "/category");
      setCategory(response.data);
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
          await axios.delete(API_URL + "/product/" + id).then((res) => {
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

  const handleStatus = async (e, id) => {
    const isChecked = e.target.checked;
    const value = {
      id: id,
      recommend: isChecked,
    };
    //console.log(isChecked);

    await axios
      .post(API_URL + "/change-recommend", value)
      .then((res) => {
        //console.log(res);
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectCategory = (e) => {
    const value = e.target.value;

    if (value === "all") {
      setDataFilter(data);
    } else {
      const filterData = data.filter((item) => {
        return item.category.name == value;
      });
      setDataFilter(filterData);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataFilter.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataFilter.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      className={`inline-block w-8 h-8 text-center leading-8 ${number === currentPage
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
        <p className="text-2xl font-bold w-full px-10">รายการสินค้าทั้งหมด</p>
      </section>
      <section className="flex flex-col justify-start px-5">
        <Link
          href={"/admin/addproduct"}
          className="btn btn-accent  mx-auto mt-4 mb-5 shadow-md max-w-[15rem] w-full border-2 border-b-green-400"
        >
          เพิ่มสินค้า
        </Link>
        <select
          defaultValue="all"
          className="select select-bordered w-full max-w-xs mx-auto shadow-md"
          onChange={(e) => handleSelectCategory(e)}
        >
          <option value="all">หมวดหมู่ทั้งหมด</option>
          {category.length > 0 &&
            category.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
        </select>
        <div className="overflow-x-auto mt-3 rounded-xl bg-clip-border shadow-md">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-gray-500 text-sm sm:text-[15px] font-bold">
                  รูป
                </th>
                <th className="whitespace-nowrap text-left px-4 py-2 text-gray-500 text-sm sm:text-[15px] font-bold">
                  ชื่อสินค้า
                </th>
                <th className="whitespace-nowrap text-left px-4 py-2 text-gray-500 text-sm sm:text-[15px] font-bold">
                  รายละเอียด
                </th>
                <th className="whitespace-nowrap text-center px-4 py-2 text-gray-500 text-sm sm:text-[15px] font-bold">
                  หมวดหมู่
                </th>
                <th className="whitespace-nowrap text-center px-4 py-2 text-gray-500 text-sm sm:text-[15px] font-bold">
                  วันที่เพิ่ม
                </th>
                <th className="whitespace-nowrap text-center px-4 py-2 text-gray-500 text-sm sm:text-[15px] font-bold">
                  อัพเดท
                </th>
                <th className="whitespace-nowrap text-center px-4 py-2 text-gray-500 text-sm sm:text-[15px] font-bold">
                  สินค้าแนะนำ
                </th>

                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {currentItems &&
                currentItems?.map((item) => (
                  <tr key={item._id}>
                    <td className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900">
                      <div className="w-16 max-h-9 md:w-24 md:max-h-14 rounded mx-auto overflow-hidden">
                        <Image
                          src={`${URL_IMAGES}${item.file}`}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="w-full h-auto object-cover object-center"
                          loading= "lazy"
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-xs sm:text-[15px] max-w-[15rem] overflow-auto break-all">
                      {item.name}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 text-xs sm:text-[15px] max-w-[20rem] w-full overflow-auto break-all">
                      {item.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-xs sm:text-[15px] truncate hover:text-clip max-w-xs overflow-auto break-all">
                      {item.category?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-xs sm:text-[15px] truncate hover:text-clip max-w-xs overflow-auto break-all">
                      {DateTime.fromISO(item.createdAt)
                        .setZone("Asia/Bangkok")
                        .toLocaleString({ locale: "th", day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-xs sm:text-[15px] truncate hover:text-clip max-w-xs overflow-auto break-all">
                      {DateTime.fromISO(item.updatedAt)
                        .setZone("Asia/Bangkok")
                        .toRelative({ locale: "th" })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-xs sm:text-[15px] max-w-sm w-full overflow-auto break-all text-center">
                      <input
                        type="checkbox"
                        className="toggle toggle-warning"
                        checked={item.recommend}
                        onChange={(e) => handleStatus(e, item._id)}
                      />
                    </td>

                    <td className="whitespace-nowrap px-4 py-2">
                      <Link
                        href={`/admin/editproduct/${item._id}`}
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
              className={`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${currentPage === 1 ? "cursor-not-allowed" : ""
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
              className={`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${currentPage === Math.ceil(dataFilter.length / itemsPerPage)
                ? "cursor-not-allowed"
                : ""
                }`}
              onClick={() => {
                if (currentPage < Math.ceil(dataFilter.length / itemsPerPage)) {
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

export default AdminAllProduct;
