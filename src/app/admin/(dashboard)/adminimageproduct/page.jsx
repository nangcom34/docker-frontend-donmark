"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../../../../config/constants";

const AdminImageProduct = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    if (!localStorage.token) {
      router.push("/login");
    }
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
        <p className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl mt-10">
          รูปสินค้าใหม่ / ลดราคา
        </p>
        <Link
          href={"/admin/addimageproduct"}
          className="btn btn-accent  mx-auto mt-10 mb-5 shadow-md max-w-[15rem] w-full border-2 border-b-green-400"
        >
          เพิ่มรูปสินค้า
        </Link>
        <article className="mx-auto w-full flex flex-wrap items-center justify-evenly mb-2 gap-3">
          {data &&
            data?.map((item) => (
              <aside
                key={item._id}
                className="mx-auto max-w-[300px] w-full flex flex-col items-center justify-between shadow-lg shadow-slate-400 rounded-2xl my-2 bg-slate-100"
              >
                <div className="w-full max-h-[400px] rounded-2xl mx-auto overflow-hidden object-center">
                  <Image
                    src={"http://localhost:5000/uploads/" + item.file}
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
                  <p>สินค้าลดราคา</p>
                      <input
                        type="checkbox"
                        className="toggle toggle-warning"
                        checked={item.sale}
                        onChange={(e) => handleStatus(e, item._id)}
                      />
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
