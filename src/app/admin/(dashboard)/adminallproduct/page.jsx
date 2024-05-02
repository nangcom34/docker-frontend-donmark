"use client";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL, URL_IMAGES } from "../../../../../config/constants";
import { DateTime } from "luxon";
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

const AdminAllProduct = () => {

  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [data, setData] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState([]);

  const [categorySelect, setCategorySelect] = useState([]);
  const [subCategorySelect, setSubCategorySelect] = useState([]);
  const [subSubCategorySelect, setSubSubCategorySelect] = useState([]);

  const [checkedCategories, setCheckedCategories] = useState({});
  const [checkedSubCategories, setCheckedSubCategories] = useState({});
  const [checkedSubSubCategories, setCheckedSubSubCategories] = useState({});

  useEffect(() => {
    loadData();
    loadCategory();
    loadSubCategory()
    loadSubSubCategory()
  }, []);

  useEffect(() => {
    if ((categorySelect && categorySelect.length > 0) ||
      (subCategorySelect && subCategorySelect.length > 0) ||
      (subSubCategorySelect && subSubCategorySelect.length > 0)) {
      setCurrentPage(1); // ตั้ง currentPage เป็น 1 เมื่อมีการเลือก category
      loadProductByCat();
    } else {
      loadData()
    }
  }, [categorySelect, subCategorySelect, subSubCategorySelect]);

  const loadData = async () => {
    try {
      let filters = { limit: null, sort: "createdAt", order: "desc" };
      const response = await axios.post(API_URL + "/productby", { filters });
      setData(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProductByCat = async () => {
    setLoading(true);
    let filters = {
      limit: null,
      sort: "createdAt",
      order: "desc",
      category: categorySelect,
      subCategory: subCategorySelect,
      subSubCategory: subSubCategorySelect
    };
    //console.log("loadProductByCat", filters);
    await axios
      .post(API_URL + "/productbyCat", { filters })
      .then(async (res) => {
        //console.log(res.data);
        setData(res.data);
        setLoading(false);

      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const loadCategory = async () => {
    try {
      const response = await axios.get(API_URL + "/category");
      setCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadSubCategory = async () => {
    try {
      const response = await axios.get(API_URL + "/subCategory");
      setSubCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSubSubCategory = async () => {
    try {
      const response = await axios.get(API_URL + "/subSubCategory");
      //console.log("loadSubSubCategory", response.data)
      setSubSubCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = (e, categoryId) => {
    setLoading(true);

    // ค่า Checked
    const isChecked = e.target.checked;
    setCheckedCategories(prevState => ({
      ...prevState,
      [categoryId]: isChecked,
    }));
    // ค่าปัจจุบันที่ Check
    let inCheck = e.target.value;

    // ค่าเดิมของ Check
    let inState = [...categorySelect];

    let findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelect(inState);

    setLoading(false);
  };

  const handleSubCategoryCheck = (e, categoryId) => {
    setLoading(true);

    const isChecked = e.target.checked;
    setCheckedSubCategories(prevState => ({
      ...prevState,
      [categoryId]: isChecked,
    }));

    let inCheck = e.target.value;
    let inStatesubCategory = [...subCategorySelect];
    let findCheck = inStatesubCategory.indexOf(inCheck);

    if (findCheck === -1) {
      inStatesubCategory.push(inCheck);
    } else {
      inStatesubCategory.splice(findCheck, 1);
    }
    setSubCategorySelect(inStatesubCategory);

    setLoading(false);
  };

  const handleSubSubCategoryCheck = (e, categoryId) => {
    setLoading(true);

    const isChecked = e.target.checked;
    setCheckedSubSubCategories(prevState => ({
      ...prevState,
      [categoryId]: isChecked,
    }));

    let inCheck = e.target.value;
    let inStatesubSubCategory = [...subSubCategorySelect];
    let findCheck = inStatesubSubCategory.indexOf(inCheck);

    if (findCheck === -1) {
      inStatesubSubCategory.push(inCheck);
    } else {
      inStatesubSubCategory.splice(findCheck, 1);
    }
    setSubSubCategorySelect(inStatesubSubCategory);

    setLoading(false);
  };

  const handleResetCategory = async () => {
    setLoading(true);

    setCategorySelect([]);
    setSubCategorySelect([]);
    setSubSubCategorySelect([]);
    setCheckedCategories({})
    setCheckedSubCategories({})
    setCheckedSubSubCategories({})
    setCurrentPage(1); // ตั้ง currentPage เป็น 1 เมื่อ Reset

    setLoading(false);
  }

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
        loadProductByCat();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
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

  const renderResultInfo = () => {
    const totalResults = data.length;
    const startResult = (currentPage - 1) * itemsPerPage + 1;
    const endResult = Math.min(currentPage * itemsPerPage, totalResults);
    return `กำลังแสดง ${startResult} ถึง ${endResult} จาก ${totalResults} รายการ`;
  }

  return (
    <main>
      <section className="flex flex-col justify-start px-5 overflow-hidden">
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white rounded-l-xl py-4 pb-12 shadow-xl shadow-red-400/30">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-[16px] font-semibold text-gray-900">ตัวกรองหมวดหมู่</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 group"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6 group-hover:text-white group-hover:bg-red-500 rounded-full" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-400">
                    <div className='w-full flex items-center justify-center'>
                      <a
                        role="button"
                        onClick={() => handleResetCategory()}
                        className='bg-red-500 border hover:border-red-500 hover:bg-white text-white hover:text-red-500 btn btn-xs w-20 duration-500 mt-2'>
                        Reset
                      </a>
                    </div>

                    {category && category.map((categoryItem, categoryIdx) => (

                      <Disclosure as="div" key={categoryIdx} className="border-b border-gray-200 px-4 py-3">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-red-500 group">
                                <span className="text-[16px] font-semibold text-gray-900 group-hover:text-red-500">
                                  {categoryItem.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-2">
                              <div className="space-y-2">

                                <div className="flex items-center w-full overflow-hidden">
                                  <input
                                    onChange={(e) => handleCheck(e, categoryItem._id)}
                                    value={categoryItem._id}
                                    checked={checkedCategories[categoryItem._id] || false}
                                    name='category'
                                    type="checkbox"
                                    className="checkbox checkbox-xs border-black checked:border-black [--chkbg:theme(colors.red.500)] [--chkfg:white]"
                                  />
                                  <label
                                    htmlFor={`filter-${categoryItem.name}-${categoryIdx}`}
                                    className="ml-1 text-[13px] text-black font-normal"
                                  >
                                    {categoryItem.name}
                                  </label>
                                </div>
                                <div className='ml-1.5 border-l-2 border-gray-200 border-dashed'>
                                  {subCategory && subCategory
                                    .filter((subCategoryItem) =>
                                      subCategoryItem.category._id === categoryItem._id
                                    )
                                    .map((subCategoryItem, subCategoryIdx) => (
                                      <div key={subCategoryIdx} className="w-full">
                                        <div className="flex items-center w-full overflow-hidden ml-2">
                                          <input
                                            onChange={(e) => handleSubCategoryCheck(e, subCategoryItem._id)}
                                            value={subCategoryItem._id}
                                            checked={checkedSubCategories[subCategoryItem._id] || false}
                                            name='subCategory'
                                            type="checkbox"
                                            className="checkbox checkbox-xs border-black checked:border-orange-600 [--chkbg:theme(colors.red.500)] [--chkfg:white]"
                                          />
                                          <label
                                            htmlFor={`filter-${subCategoryItem.name}-${subCategoryIdx}`}
                                            className="ml-1 text-[13px] text-black font-normal"
                                          >
                                            {subCategoryItem.name}
                                          </label>
                                        </div>
                                        <div className='ml-3.5 my-1 border-l-2 border-gray-200 border-dashed'>
                                          {subSubCategory &&
                                            subSubCategory
                                              .filter((subSubCategoryItem) =>
                                                subSubCategoryItem.subCategory._id === subCategoryItem._id
                                              )
                                              .map((subSubCategoryItem, subSubCategoryIdx) => (
                                                < div key={subSubCategoryIdx} className="flex items-center ml-2 w-full" >
                                                  <input
                                                    onChange={(e) => handleSubSubCategoryCheck(e, subSubCategoryItem._id)}
                                                    value={subSubCategoryItem._id}
                                                    checked={checkedSubSubCategories[subSubCategoryItem._id] || false}
                                                    name='subSubCategory'
                                                    type="checkbox"
                                                    className="checkbox checkbox-xs border-gray-600 checked:border-green-300 [--chkbg:theme(colors.red.500)] [--chkfg:white]"
                                                  />
                                                  <label
                                                    htmlFor={`filter-${subSubCategoryItem.name}-${subSubCategoryIdx}`}
                                                    className="ml-1 flex-1 text-[13px] text-gray-600 font-normal"
                                                  >
                                                    {subSubCategoryItem.name}
                                                  </label>
                                                </div>
                                              ))}
                                        </div>
                                      </div>

                                    ))}
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}


                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <p className="text-xl font-bold text-red-600 sm:text-2xl mt-5">
          รายการสินค้า
        </p>
        <Link
          href={"/admin/addproduct"}
          className="btn bg-indigo-600 border-0 text-white hover:text-black duration-300 mx-auto mb-1 shadow-md shadow-indigo-400/30 px-8"
        >
          เพิ่มสินค้า
        </Link>

        <section className="grid overflow-hidden">

          <div className="flex items-center justify-end gap-10 md:gap-20 border-b pb-2">
            <a
              role="button"
              onClick={() => handleResetCategory()}
              className='bg-red-500 border hover:border-red-500 hover:bg-white text-white hover:text-red-500 btn btn-xs w-20 duration-500'>
              Reset
            </a>
            <button
              type="button"
              className="px-2 btn btn-outline btn-sm btn-neutral text-gray-700 hover:text-red-500 flex items-center gap-1"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <span className="text-xs">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

         
          <div className="overflow-x-auto mt-2 rounded-xl shadow-md relative">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm table-fixed">
              <thead className="">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-500 text-sm sm:text-[15px] font-bold">
                    รูป
                  </th>
                  <th className="whitespace-nowrap text-left px-4 py-2 text-gray-500 text-sm sm:text-[15px] font-bold">
                    ชื่อสินค้า
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
                          <img
                            src={`${URL_IMAGES}${item.files[0]}`}
                            alt={item.name}
                            className="w-auto h-auto object-fill"
                            loading="lazy"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2 text-xs sm:text-[15px] max-w-[250px]">
                        {item.name}
                      </td>


                      <td className="whitespace-nowrap px-4 py-2 text-xs sm:text-[15px] max-w-[100px] overflow-x-auto break-all">
                        🌟{item.category?.name} <br /> ⭐{item.subCategory?.name}
                        {item.subSubCategory?.name ? (<span><br />⚡{item.subSubCategory?.name}</span>) : null}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-xs sm:text-[15px] truncate hover:text-clip max-w-xs  break-all">
                        {DateTime.fromISO(item.createdAt)
                          .setZone("Asia/Bangkok")
                          .toLocaleString({
                            locale: "th",
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-xs sm:text-[15px] truncate hover:text-clip max-w-xs overflow-auto break-all">
                        {DateTime.fromISO(item.updatedAt)
                          .setZone("Asia/Bangkok")
                          .toRelative({ locale: "th" })}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-xs sm:text-[15px] text-center">
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
           {/* ข้อมูลรายการ */}
           <div className="flex items-center justify-center mt-2">
            <p className="text-xs font-medium text-gray-500">
              {renderResultInfo()}
            </p>
          </div>

          {/* Pagination */}
          {
            data && data.length > 0
              ?
              (<section className={`${pageNumbers && pageNumbers.length <= 1 ? "hidden" : "flex items-center justify-center mb-10 mt-2"}`}>
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
                      className={`flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 ${currentPage === Math.ceil(data.length / itemsPerPage)
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
                </ul>
              </section>)
              : null
          }


        </section>
      </section>
    </main>
  );
};

export default AdminAllProduct;
