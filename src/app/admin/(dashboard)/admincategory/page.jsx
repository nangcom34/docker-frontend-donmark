"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../../../../config/constants";

const AdminCategory = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    if (!localStorage.donmarktoken) {
      router.push("/login");
    }
    loadData();
  }, []);

  const loadData = async () => {
    let filtersCategory = { limit: null, sort: "createdAt", order: "desc" }
    await axios
      .post(API_URL + "/categoryby", { filtersCategory })
      .then((res) => {
        //console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
          await axios.delete(API_URL + "/category/" + id).then((res) => {
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



  return (
    <main>
      <section className="flex flex-col justify-start px-5">
        <p className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl mt-10">
          หมวดหมู่สินค้า
        </p>
        <Link
          href={"/admin/addcategory"}
          className="btn btn-accent  mx-auto mt-10 mb-5 shadow-md max-w-[15rem] w-full border-2 border-b-green-400"
        >
          เพิ่มหมวดหมู่สินค้า
        </Link>
        {data &&
          data?.map((item) => (
            <article
              key={item._id}
              className="mx-auto w-full h-20 max-w-screen-sm flex items-center justify-between shadow-lg shadow-slate-400 rounded-lg mb-2 bg-white"
            >
              <p className="text-sm md:text-lg font-bold ml-5 md:ml-10">{item.name}</p>
              <div className="whitespace-nowrap px-4 py-2">
                <Link
                  href={`/admin/editcategory/${item._id}`}
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
            </article>
          ))}
      </section>
    </main>
  );
};

export default AdminCategory;
