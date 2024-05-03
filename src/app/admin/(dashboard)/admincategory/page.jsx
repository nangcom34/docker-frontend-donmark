"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../../../../config/constants";

const AdminCategory = () => {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState([]);

  useEffect(() => {
    loadCategory();
    loadSubCategory()
    loadSubSubCategory()
  }, []);

  const loadCategory = async () => {
    let filtersCategory = { limit: null, sort: "createdAt", order: "desc" }
    await axios
      .post(API_URL + "/categoryby", { filtersCategory })
      .then((res) => {
        console.log("Cateroty", res.data);
        setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadSubCategory = async () => {
    let filtersSubCategory = { limit: null, sort: "createdAt", order: "desc" }
    await axios
      .post(API_URL + "/subCategoryby", { filtersSubCategory })
      .then((res) => {
        //console.log("subCateroty", res.data);
        setSubCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadSubSubCategory = async () => {
    let filtersSubSubCategory = { limit: null, sort: "createdAt", order: "desc" }
    await axios
      .post(API_URL + "/subSubCategoryby", { filtersSubSubCategory })
      .then((res) => {
        console.log("subSubCateroty", res.data);
        setSubSubCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteCategory = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-error mr-2",
      },
      buttonsStyling: false,
    });

    // ตรวจสอบว่ามี subCategory ที่เชื่อมโยงกับหมวดหมู่หลักหรือไม่
    const hasRelatedSubCategory = subCategory.some(subCategoryItem => subCategoryItem.category?._id === id);

    if (hasRelatedSubCategory) {
      swalWithBootstrapButtons.fire(
        "ล้มเหลว!",
        "ไม่สามารถลบหมวดหมู่ได้เนื่องจากมีหมวดหมู่รองที่เชื่อมโยงอยู่",
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
          await axios.delete(API_URL + "/category/" + id).then((res) => {
            //console.log(res);
            loadCategory();
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

  const handleDeleteSubCategory = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-error mr-2",
      },
      buttonsStyling: false,
    });
    // ตรวจสอบว่ามี subSubCategory ที่เชื่อมโยงกับหมวดหมู่หลักหรือไม่
    const hasRelatedSubSubCategory = subSubCategory.some(subSubCategoryItem => subSubCategoryItem.subCategory?._id === id);

    if (hasRelatedSubSubCategory) {
      swalWithBootstrapButtons.fire(
        "ล้มเหลว!",
        "ไม่สามารถลบหมวดหมู่รองได้เนื่องจากมีหมวดหมู่ย่อยที่เชื่อมโยงอยู่",
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
          await axios.delete(API_URL + "/subCategory/" + id).then((res) => {
            //console.log(res);
            loadSubCategory();
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

  const handleDeleteSubSubCategory = async (id) => {
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
          await axios.delete(API_URL + "/subSubCategory/" + id).then((res) => {
            //console.log(res);
            loadSubSubCategory();
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
      <section className="flex flex-col justify-start px-5 w-full">
        <p className="text-center text-2xl font-bold text-red-600 sm:text-3xl mt-10">
          หมวดหมู่สินค้า
        </p>
        <div className="flex items-center justify-center flex-wrap mx-auto mt-10 mb-5 gap-x-5 gap-y-2 w-full">
          <Link
            href={"/admin/addcategory"}
            className="btn btn-sm sm:btn-md btn-outline btn-warning bg-gray-600 text-xs sm:text-sm duration-300"
          >
            🌟เพิ่มหมวดหมู่หลัก🌟
          </Link>
          <Link
            href={"/admin/addsubCategory"}
            className="btn btn-sm sm:btn-md btn-outline btn-warning bg-gray-600 text-xs sm:text-sm duration-300"
          >
            ⭐เพิ่มหมวดหมู่รอง⭐
          </Link>
          <Link
            href={"/admin/addsubSubCategory"}
            className="btn btn-sm sm:btn-md btn-outline btn-warning bg-gray-600 text-xs sm:text-sm duration-300"
          >
            ⚡เพิ่มหมวดหมู่ย่อย⚡
          </Link>
        </div>

        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {category &&
            category.map((categoryItem) => (
              <article
                key={categoryItem._id}
                className="mx-auto w-full flex flex-col items-center shadow-lg shadow-slate-400 rounded-lg mb-2 bg-white py-5"
              >
                <aside className="flex items-center justify-between w-full">
                  <p className="text-xs sm:text-sm md:text-[16px] font-bold ml-5 md:ml-10">🌟หมวดหมู่หลัก : {categoryItem.name}</p>
                  <div className="whitespace-nowrap px-4 py-2">
                    <Link
                      href={`/admin/editcategory/${categoryItem._id}`}
                      className="btn btn-outline btn-primary btn-sm m-1"
                    >
                      แก้ไข
                    </Link>
                    <button
                      className="btn btn-outline btn-error btn-sm"
                      onClick={() => handleDeleteCategory(categoryItem._id)}
                    >
                      ลบ
                    </button>
                  </div>
                </aside>
                <ul className="flex flex-col items-start justify-start w-full">
                  {subCategory &&
                    subCategory
                      .filter((subCategoryItem) => subCategoryItem.category?._id === categoryItem._id)
                      .map((subCategoryItem) => (
                        <li key={subCategoryItem._id} className="flex flex-col items-start justify-center w-full px-14">
                          <section className="flex items-center w-full">
                            <p className="text-xs sm:text-sm text-gray-600 font-semibold">⭐หมวดหมู่รอง : {subCategoryItem.name}</p>
                            <div className="whitespace-nowrap px-4 py-2">
                              <Link
                                href={`/admin/editsubCategory/${subCategoryItem._id}`}
                                className="btn btn-outline btn-primary btn-xs m-1"
                              >
                                แก้ไข
                              </Link>
                              <button
                                className="btn btn-outline btn-error btn-xs"
                                onClick={() => handleDeleteSubCategory(subCategoryItem._id)}
                              >
                                ลบ
                              </button>
                            </div>
                          </section>
                          <section className="flex flex-col items-start justify-start w-full">
                            {subSubCategory &&
                              subSubCategory
                                .filter((subSubCategoryItem) => subSubCategoryItem.subCategory?._id === subCategoryItem._id)
                                .map((subSubCategoryItem) => (
                                  <div key={subSubCategoryItem._id} className="flex flex-col items-start justify-start w-full px-5">
                                    <section className="flex items-center w-full">
                                      <p className="text-xs sm:text-sm text-gray-500 font-medium">⚡หมวดหมู่ย่อย : {subSubCategoryItem.name}</p>
                                      <div className="whitespace-nowrap px-4 py-2">
                                        <Link
                                          href={`/admin/editsubSubCategory/${subSubCategoryItem._id}`}
                                          className="btn btn-outline btn-primary btn-xs m-1"
                                        >
                                          แก้ไข
                                        </Link>
                                        <button
                                          className="btn btn-outline btn-error btn-xs"
                                          onClick={() => handleDeleteSubSubCategory(subSubCategoryItem._id)}
                                        >
                                          ลบ
                                        </button>
                                      </div>
                                    </section>
                                  </div>
                                ))}
                          </section>
                        </li>
                      ))}
                </ul>
              </article>
            ))}




        </section>
      </section>
    </main>
  );
};

export default AdminCategory;
