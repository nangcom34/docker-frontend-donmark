"use client";
import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import Link from "next/link";
import ProductCard from "../components/ProductModal";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useSearchParams } from "next/navigation";
import { API_URL, URL_IMAGES } from "../../../config/constants";
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [products, setProducts] = useState([]);

  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const [query, setQuery] = useState("");

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState([]);

  const [categorySelect, setCategorySelect] = useState([]);
  const [subCategorySelect, setSubCategorySelect] = useState([]);
  const [subSubCategorySelect, setSubSubCategorySelect] = useState([]);

  const [checkedCategories, setCheckedCategories] = useState({});
  const [checkedSubCategories, setCheckedSubCategories] = useState({});
  const [checkedSubSubCategories, setCheckedSubSubCategories] = useState({});

  // Log ค่า text
  //console.log(search);
  useEffect(() => {
    loadProduct();
    loadCategory();
    loadSubCategory()
    loadSubSubCategory()
  }, []);

  useEffect(() => {
    let newSearch = searchParams.get("query") || ''; // ดึงค่า query จาก searchParams
    setSearch(newSearch); // อัปเดตค่า search
    setCurrentPage(1);
    //console.log("newSearch", newSearch)
  }, [searchParams]);

  useEffect(() => {
    setQuery(search);
    console.log("search--->", search)
  }, [search]);

  useEffect(() => {
    loadProduct();
  }, [query]);

  useEffect(() => {
    if ((categorySelect && categorySelect.length > 0) ||
      (subCategorySelect && subCategorySelect.length > 0) ||
      (subSubCategorySelect && subSubCategorySelect.length > 0)) {
      setCurrentPage(1); // ตั้ง currentPage เป็น 1 
      loadProductByCat();
    } else {
      loadProduct();
    }
  }, [categorySelect, subCategorySelect, subSubCategorySelect]);

  const loadProduct = async () => {
    setLoading(true);
    let filters = { limit: null, sort: "createdAt", order: "desc" };
    if (query) {
      filters.query = query;
    }
    //console.log(filters);
    await axios
      .post(API_URL + "/productby", { filters })
      .then(async (res) => {
        //console.log(res.data);
        setProducts(res.data);
        setLoading(false);

      })
      .catch((error) => {
        console.log(error);
        //setLoading(false);
      });
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
        setProducts(res.data);
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
    setQuery("")
    // เปลี่ยนค่า search ให้เป็น ""
    setSearch("")
    // สร้างอ็อบเจ็กต์ URLSearchParams ใหม่จากพารามิเตอร์ค้นหา URL ปัจจุบัน
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.delete('query'); // ลบพารามิเตอร์ query ออก

    // แทนที่ URL ปัจจุบันด้วย URL ใหม่ที่ไม่มีพารามิเตอร์ query
    window.history.replaceState({}, '', `${window.location.pathname}?${newSearchParams.toString()}`);

    setLoading(false);
  }



  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
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
    const totalResults = products.length;
    const startResult = (currentPage - 1) * itemsPerPage + 1;
    const endResult = Math.min(currentPage * itemsPerPage, totalResults);
    return `กำลังแสดง ${startResult} ถึง ${endResult} จาก ${totalResults} รายการ`;
  }

  return (
    <main className="flex flex-col min-h-screen mx-auto">
      <Header />
      <Navbar />

      <div className='flex-grow'>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileFiltersOpen}>
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

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">รายการสินค้า</h1>

            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-red-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters อยู่ใน div ก่อน Product grid */}
              <form className="hidden lg:block">
                <div className='w-full flex items-center justify-between relative'>
                  <span className='text-xs md:text-[16px]'>ตัวกรองหมวดหมู่</span>
                  <a
                    role="button"
                    onClick={() => handleResetCategory()}
                    className='bg-red-500 border hover:border-red-500 hover:bg-white text-white hover:text-red-500 btn btn-xs w-20 duration-500'>
                    Reset
                  </a>
                </div>

                {category && category.map((categoryItem, categoryIdx) => (
                  <Disclosure as="div" key={categoryIdx} className="p-3 my-3 bg-gray-200 rounded-xl duration-500">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button
                            className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-red-500 group ">
                            <span className=" font-semibold text-gray-900 group-hover:text-red-500">
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
                        <Disclosure.Panel className="pt-2 pr-2">
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
                            <div className='ml-1.5 border-l-2 border-white border-dashed'>
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
                                    <div className='ml-3.5 my-1 border-l-2 border-white border-dashed'>
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
                                                className="checkbox checkbox-xs border-gray-700 checked:border-green-300 [--chkbg:theme(colors.red.500)] [--chkfg:white]"
                                              />
                                              <label
                                                htmlFor={`filter-${subSubCategoryItem.name}-${subSubCategoryIdx}`}
                                                className="ml-1 flex-1 text-[13px] text-gray-700 font-normal"
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

              {/* Product grid */}
              {loading
                ?
                <section
                  className={`lg:col-span-3 flex-grow w-full mx-auto flex flex-col items-center justify-center
                    `}
                >
                  <h3 className="text-lg font-semibold">Loading...</h3>
                  <aside className="flex items-center justify-center gap-2">
                    <span className="loading loading-ring loading-sm"></span>
                    <span className="loading loading-ring loading-md"></span>
                    <span className="loading loading-ring loading-lg"></span>
                    <span className="loading loading-ring loading-md"></span>
                    <span className="loading loading-ring loading-sm"></span>
                  </aside>
                  <img
                    src={`/images/logo.png`}
                    alt="logo"
                    className="w-[100px] object-cover"
                    loading="lazy"
                  />
                  <aside className="flex items-center justify-center gap-2">
                    <span className="loading loading-ring loading-sm"></span>
                    <span className="loading loading-ring loading-md"></span>
                    <span className="loading loading-ring loading-lg"></span>
                    <span className="loading loading-ring loading-md"></span>
                    <span className="loading loading-ring loading-sm"></span>
                  </aside>
                </section>
                :
                <div className={`lg:col-span-3`}>

                  {/* ข้อมูลรายการ */}
                  <section className="flex items-center justify-center my-5">
                    <p className="text-xs font-medium text-gray-500">
                      {renderResultInfo()}
                    </p>
                  </section>
                  <section
                    className={`${currentItems.length === 0 ? "flex-grow w-full mx-auto max-w-screen-xl flex flex-col items-center justify-center" : "hidden"
                      }`}
                  >
                    <h3 className="text-lg font-semibold">ไม่พบสินค้า</h3>
                    <aside className="flex items-center justify-center gap-2">
                      <span className="loading loading-ring loading-sm"></span>
                      <span className="loading loading-ring loading-md"></span>
                      <span className="loading loading-ring loading-lg"></span>
                      <span className="loading loading-ring loading-md"></span>
                      <span className="loading loading-ring loading-sm"></span>
                    </aside>
                    <img
                      src={`/images/logo.png`}
                      alt="logo"
                      className="w-[100px] object-cover"
                      loading="lazy"
                    />
                    <aside className="flex items-center justify-center gap-2">
                      <span className="loading loading-ring loading-sm"></span>
                      <span className="loading loading-ring loading-md"></span>
                      <span className="loading loading-ring loading-lg"></span>
                      <span className="loading loading-ring loading-md"></span>
                      <span className="loading loading-ring loading-sm"></span>
                    </aside>
                  </section>
                  <section className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 flex-grow">
                    {currentItems && currentItems.map((productItem) => (
                      <Link
                        href={`/product/${productItem._id}`}
                        key={productItem._id}
                        className="group relative">
                        <aside
                          className="w-full overflow-hidden rounded-md bg-gray-200 group-hover:-translate-y-4 duration-500">
                          <img
                            src={`${URL_IMAGES}${productItem.files[0]}`}
                            alt={productItem.name}
                            className="h-auto w-full object-cover object-center duration-500 rounded-lg"
                          />
                        </aside>
                        <div className="mt-4 flex justify-center px-3">
                          <div>
                            <h3 className="text-sm text-gray-700 text-center font-medium group-hover:text-red-600">

                              <span aria-hidden="true" className="absolute inset-0" />
                              {productItem.name}

                            </h3>
                          </div>
                        </div>

                      </Link>
                    ))}
                  </section>
                  {/* ข้อมูลรายการ */}
                  <section className="flex items-center justify-center my-5">
                    <p className="text-xs font-medium text-gray-500">
                      {renderResultInfo()}
                    </p>
                  </section>

                  {/* Pagination */}
                  <section className={`${pageNumbers && pageNumbers.length <= 1 ? "hidden" : "flex items-center justify-center my-5"}`}>
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
                          className={`flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 ${currentPage === Math.ceil(products.length / itemsPerPage)
                            ? "cursor-not-allowed"
                            : ""
                            }`}
                          onClick={() => {
                            if (currentPage < Math.ceil(products.length / itemsPerPage)) {
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
                  </section>
                </div>
              }
            </div>
          </section>
        </main>
      </div >
      <Footer />
    </main >
  );
};

export default AllProducts;
