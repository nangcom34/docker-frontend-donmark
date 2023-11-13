"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useSearchParams } from "next/navigation";
import { API_URL, URL_IMAGES } from "../../../config/constants";

const AllProducts = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("query");

  // Log ค่า text
  //console.log(search);
  useEffect(() => {
    loadProduct();
    loadCategory();
  }, []);

  useEffect(() => {
    loadProduct();
  }, [search]);

  const loadProduct = async () => {
    let filters = { limit: null, sort: "createdAt", order: "desc" };
    if (search) {
      filters.query = search;
    }
    //console.log(filters);
    await axios
      .post(API_URL + "/productby", { filters })
      .then((res) => {
        //console.log(res.data);
        setProduct(res.data);
        setCategoryFilter(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadCategory = async () => {
    await axios
      .get(API_URL + "/category")
      .then((res) => {
        //console.log(res.data);
        setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectCategory = (e) => {
    const value = e.target.value;

    if (value === "all") {
      setCategoryFilter(product);
    } else {
      const filterCategory = product.filter((item) => {
        return item.category.name == value;
      });
      setCategoryFilter(filterCategory);
    }
  };
  //console.log(categoryFilter);
  //console.log(product);

  return (
    <>
      <Header />
      <Navbar />
      <section
        className={`w-full max-w-screen-xl flex flex-col items-center justify-center mx-auto`}
      >
        {" "}
        <hr className=" w-1/2 mx-auto" />
        <select
          defaultValue="all"
          className="select select-bordered border-red-600 focus:outline-red-600 w-full max-w-xs mx-auto shadow-md my-5 text-xs sm:text-[16px] font-semibold"
          onChange={(e) => handleSelectCategory(e)}
        >
          <option disabled>ตัวกรองหมวดหมู่</option>
          <option value="all">หมวดหมู่ทั้งหมด</option>
          {category.length > 0 &&
            category.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
        </select>
      </section>

      <section
        className={`${
          categoryFilter.length === 0 ? "h-full min-h-[63vh]" : ""
        }`}
      ></section>

      {category &&
        category
          .filter((categoryItem) =>
            categoryFilter.some(
              (productItem) => productItem.category?._id === categoryItem._id
            )
          )
          .map((categoryItem) => (
            <section key={categoryItem._id}>
              <article className="mx-auto max-w-screen-xl w-full overflow-hidden mb-3 md:mb-10">
                <h2 className="mt-8 px-5 lg:px-0 font-bold text-right text-sm sm:text-[16px] md:text-xl lg:text-3xl uppercase">
                  {categoryItem.name}
                </h2>
              </article>
              <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-8 md:gap-y-20 my-10 lg:gap-x-5 max-w-screen-xl mx-auto min-h-[52vh] px-5 ">
                {categoryFilter &&
                  categoryFilter
                    .filter(
                      (productItem) =>
                        productItem.category?._id === categoryItem?._id
                    )
                    .map((item, index) => (
                      <aside
                        onClick={() => {
                          document
                            .getElementById(`my_modal_${item._id}`)
                            .showModal();
                        }}
                        key={item._id}
                        className="block w-[100px] sm:w-[150px] md:w-[180px] lg:w-[180px] xl:w-[180px] hover:-translate-y-6 duration-500 mx-auto"
                      >
                        <Image
                          src={`${URL_IMAGES}${item.file}`}
                          alt="home"
                          width={1024}
                          height={768}
                          className=" h-[150px] sm:h-[200px] w-full object-cover md:h-[230px] rounded-md"
                          style={{
                            loading: "lazy",
                          }}
                        />
                        <p className="mt-1 font-bold text-xs sm:text-sm md:text-md lg:text-lg truncate hover:text-clip">
                          {item.name}
                        </p>
                        <dialog
                          id={`my_modal_${item._id}`}
                          className="modal m-auto"
                        >
                          <div className="modal-box p-0 relative max-h-[90vh] overflow-hidden flex">
                            <ProductCard data={item} />
                          </div>
                        </dialog>
                      </aside>
                    ))}
              </article>
            </section>
          ))}
      <Footer />
    </>
  );
};

export default AllProducts;
