"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL, URL_IMAGES } from "../../../../../config/constants";

const AdminImageProduct = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await axios
      .post(API_URL + "/imageProductby", {
        limit: null,
        sort: "createdAt",
        order: "desc",
      })
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
          await axios.delete(API_URL + "/imageProduct/" + id).then((res) => {
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
      sale: isChecked,
    };
    //console.log(isChecked);
    await axios
      .post(API_URL + "/change-sale", value)
      .then((res) => {
        //console.log(res);
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <section className="flex flex-col justify-start px-5 overflow-hidden">
        <p className="text-center text-2xl font-bold text-red-600 sm:text-3xl mt-10">
          รูปสินค้าใหม่ / ลดราคา
        </p>
        <Link
          href={"/admin/addimageproduct"}
          className="btn bg-indigo-600 border-0 text-white hover:text-black duration-300 mx-auto mt-10 mb-5 shadow-md max-w-[15rem] w-full"
        >
          เพิ่มรูปสินค้า
        </Link>
        <article className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-2 gap-3">
          {data &&
            data?.map((item) => (
              <aside
                key={item._id}
                className="mx-auto max-w-[300px] w-full flex flex-col items-center justify-between shadow-lg shadow-slate-400 rounded-2xl my-2 bg-slate-100"
              >
                <div className="w-full max-h-[250px] flex items-center justify-center rounded-2xl mx-auto overflow-hidden">
                  <img
                    src={`${URL_IMAGES}${item.file}`}
                    alt={item._id}
                    layout="responsive"
                    className="w-full h-auto object-cover object-center"
                    loading= "lazy"
                  />
                </div>
                <div className="px-4 py-2 max-w-sm w-full overflow-auto break-all text-center mt-2">

                  <label className="flex cursor-pointer items-center justify-center gap-1">
                    <span className="label-text">สินค้าใหม่</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-warning"
                      checked={item.sale}
                      onChange={(e) => handleStatus(e, item._id)}
                    />
                    <span className="label-text">สินค้าลดราคา</span>
                  </label>

                </div>
                <div className="whitespace-nowrap px-4 py-2">
                  <Link
                    href={`/admin/editimageproduct/${item._id}`}
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

export default AdminImageProduct;
