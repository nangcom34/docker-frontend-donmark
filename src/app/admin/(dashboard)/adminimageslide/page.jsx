"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL, URL_IMAGES } from "../../../../../config/constants";

const AdminImageSlide = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    if (!localStorage.token) {
      router.push("/login");
    }
    loadData();
  }, []);

  const loadData = async () => {
    await axios
      .get(API_URL + "/imageSlide")
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
          await axios.delete(API_URL + "/imageSlide/" + id).then((res) => {
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
      <section className="flex flex-col justify-start px-5 overflow-hidden">
        <p className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl mt-10">
        Promotion
        </p>
        <Link
          href={"/admin/addimageslide"}
          className="btn btn-accent  mx-auto mt-10 mb-5 shadow-md max-w-[15rem] w-full border-2 border-b-green-400"
        >
          เพิ่ม Promotion
        </Link>
        <article className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-2 gap-3">
          {data &&
            data?.map((item) => (
              <aside
                key={item._id}
                className="mx-auto max-w-[300px] w-full flex flex-col items-center justify-between shadow-lg shadow-slate-400 rounded-2xl my-2 bg-slate-100"
              >
                <div className="w-full flex items-center justify-center max-h-[300px] rounded-2xl mx-auto overflow-hidden ">
                  <Image
                    src={`${URL_IMAGES}${item.file}`}
                    alt={item._id}
                    layout="responsive"
                    width={300}
                    height={400}
                    className="w-full h-auto object-cover object-center"
                    style={{
                      loading: "lazy",
                      
                    }}
                  />
                </div>
                <div className="px-4 py-2 max-w-sm w-full overflow-auto break-all text-center mt-2">
                  <p className="truncate px-2">{item.urlname}</p>
                     
                    </div>
                <div className="whitespace-nowrap px-4 py-2">
                  <Link
                    href={`/admin/editimageslide/${item._id}`}
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
            ))}
        </article>
      </section>
    </main>
  );
};

export default AdminImageSlide;
