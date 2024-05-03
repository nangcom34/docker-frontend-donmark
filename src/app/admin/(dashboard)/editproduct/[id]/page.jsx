"use client";
import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../../config/constants";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EditProduct = ({ params }) => {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    brand: "",
    type: "",
    material: "",
    model: "",
    wide: "",
    long: "",
    high: "",
    weight: "",
    barcode: "",
    productCode: "",
    files: [],
    category: "",
    subCategory: "",
    subSubCategory: "",
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  const [fileOld, setFileOld] = useState([]);

  useEffect(() => {
    loadCategory()
    axios
      .get(API_URL + "/product/" + params.id)
      .then((res) => {
        setProduct(res.data);
        setFileOld(res.data.files);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    if (product.long === "undefined") {
      product.long = ""
    }
    if (product.wide === "undefined") {
      product.wide = ""
    }
    if (product.high === "undefined") {
      product.high = ""
    }
    console.log("product--->", product)
  }, [product]);
  useEffect(() => {
    if (product.category && product.category != "") {
      loadSubCategories();
    }
  }, [product.category]);

  useEffect(() => {
    if (product.subCategory && product.subCategory != "") {
      loadSubSubCategories();
    }
  }, [product.subCategory]);

  const loadCategory = async () => {
    await axios
      .get(API_URL + "/category")
      .then((res) => {
        setCategories(res.data);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadSubCategories = async () => {
    try {
      const response = await axios.post(
        API_URL + "/subCategorybyCat",
        { category: product.category }
      );
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error loading sub-categories:", error);
    }
  };

  const loadSubSubCategories = async () => {
    try {
      const response = await axios.post(
        API_URL + "/subSubCategorybyCat",
        { subCategory: product.subCategory }
      );
      setSubSubCategories(response.data);
    } catch (error) {
      console.error("Error loading sub-sub-categories:", error);
    }
  };
  //console.log(product);
  const { name, description, type, material, model, wide, long, high, weight, barcode, productCode, } = product;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(product);
    //console.log(fileOld);


    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("brand", product.brand);
    formData.append("type", product.type);
    formData.append("material", product.material);
    formData.append("model", product.model);
    formData.append("wide", product.wide);
    formData.append("long", product.long);
    formData.append("high", product.high);
    formData.append("weight", product.weight);
    formData.append("barcode", product.barcode);
    formData.append("productCode", product.productCode);
    formData.append("category", product.category);
    formData.append("subCategory", product.subCategory);
    formData.append("subSubCategory", product.subSubCategory);

    if (product.files && product.files.length > 0) {
      for (let i = 0; i < product.files.length; i++) {
        formData.append("files", product.files[i]);
      }
    }

    fileOld.forEach((oldImage) => {
      formData.append("fileOld", oldImage);

    });


    await axios
      .put(API_URL + "/product/" + params.id, formData)
      .then((res) => {
        Swal.fire("สำเร็จ!", "แก้ไขสินค้าแล้ว!", "success");
        router.push("/admin/adminallproduct");
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    if (e.target.name === "files") {
      const filesArray = Array.from(e.target.files);
      setProduct({ ...product, [e.target.name]: filesArray });
      setFilePreviews(filesArray.map(file => URL.createObjectURL(file)));
    }

  };
  const handleChangeCategory = (value) => {
    setProduct((product) => ({
      ...product,
      category: value,
      subCategory: "",
      subSubCategory: "",
    }));

  };

  const handleChangeSubCategory = (value) => {
    setProduct((product) => ({
      ...product,
      subCategory: value,
      subSubCategory: "",
    }));
  };

  const handleChangeSubSubCategory = (value) => {
    setProduct((product) => ({
      ...product,
      subSubCategory: value,
    }));
  };

  return (
    <section className="flex flex-col justify-start px-5">
      <article className="mx-auto w-full px-4 sm:px-6 lg:px-8 mt-5">
        <aside className="mx-auto w-full max-w-lg">
          <p className="text-center text-xl font-bold text-indigo-600 sm:text-2xl">
            สินค้าทั้งหมด
          </p>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            action=""
            className=" mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-1 mb-10"
          >
            <p className="text-center text-lg font-medium md:col-span-2">แก้ไขสินค้า</p>

            <div className="md:col-span-2">
              <label
                class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
              >
                <input
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      name: e.target.value,
                    }));
                  }}
                  value={product.name}
                  type="text"
                  class="border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3  text-sm shadow-sm w-full"
                  placeholder="ชื่อสินค้า"
                />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                  ชื่อสินค้า
                </span>
              </label>

            </div>

            <div>
              <label
                class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
              >
                <input
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      brand: e.target.value,
                    }));
                  }}
                  value={product.brand}
                  type="text"
                  class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3 pe-12 text-sm shadow-sm"
                  placeholder="แบรนด์"
                />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                  แบรนด์
                </span>
              </label>

            </div>

            <div>
              <label
                class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
              >
                <input
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      type: e.target.value,
                    }));
                  }}
                  value={product.type}
                  type="text"
                  class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3 pe-12 text-sm shadow-sm"
                  placeholder="ประเภท"
                />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                  ประเภท
                </span>
              </label>

            </div>

            <div>
              <label
                class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
              >
                <input
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      material: e.target.value,
                    }));
                  }}
                  value={product.material}
                  type="text"
                  class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3 pe-12 text-sm shadow-sm"
                  placeholder="วัสดุที่ใช้ผลิต"
                />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                  วัสดุที่ใช้ผลิต
                </span>
              </label>
            </div>

            <div>
              <label
                class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
              >
                <input
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      model: e.target.value,
                    }));
                  }}
                  value={product.model}
                  type="text"
                  class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3 pe-12 text-sm shadow-sm"
                  placeholder="รุ่น"
                />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                  รุ่น
                </span>
              </label>
            </div>

            <div>
              <label
                class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
              >
                <input
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      weight: e.target.value,
                    }));
                  }}
                  value={product.weight}
                  type="text"
                  class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3 pe-12 text-sm shadow-sm"
                  placeholder="น้ำหนัก"
                />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                  น้ำหนัก
                </span>
              </label>

            </div>

            <div>
              <label
                class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
              >
                <input
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      barcode: e.target.value,
                    }));
                  }}
                  value={product.barcode}
                  type="text"
                  class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3 pe-12 text-sm shadow-sm"
                  placeholder="รหัสบาร์โค้ด"
                />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                  รหัสบาร์โค้ด
                </span>
              </label>
            </div>

            <div>
              <label
                class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
              >
                <input
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      productCode: e.target.value,
                    }));
                  }}
                  value={product.productCode}
                  type="text"
                  class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3 pe-12 text-sm shadow-sm"
                  placeholder="รหัสสินค้า"
                />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                  รหัสสินค้า
                </span>
              </label>
            </div>

            <div>
              <label
                class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
              >
                <input
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      wide: e.target.value,
                    }));
                  }}
                  value={product.wide}
                  type="text"
                  class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3 pe-12 text-sm shadow-sm"
                  placeholder="ความกว้าง"
                />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                  ความกว้าง
                </span>
              </label>
            </div>

            <div>
              <label
                class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
              >
                <input
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      long: e.target.value,
                    }));
                  }}
                  value={product.long}
                  type="text"
                  class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3 pe-12 text-sm shadow-sm"
                  placeholder="ความยาว"
                />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                  ความยาว
                </span>
              </label>
            </div>

            <div>
              <label
                class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500"
              >
                <input
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      high: e.target.value,
                    }));
                  }}
                  value={product.high}
                  type="text"
                  class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3 pe-12 text-sm shadow-sm"
                  placeholder="ความสูง"
                />

                <span
                  class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                  ความสูง
                </span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="sr-only">
                description
              </label>

              <div className="relative">
                <ReactQuill
                  theme="snow"
                  placeholder="รายละเอียด"
                  onChange={(content, delta, source, editor) => {
                    setProduct((product) => ({
                      ...product,
                      description: content,
                    }));
                  }}
                  value={product.description}
                  className="border-gray-200 shadow-sm "
                />
                {/* <textarea
                  onChange={(e) => {
                    setProduct((product) => ({
                      ...product,
                      description: e.target.value,
                    }));
                  }}
                  value={description}
                  className="textarea textarea-ghost w-full border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="รายละเอียดสินค้า"
                ></textarea> */}
              </div>
            </div>

            <div>
              <label htmlFor="image" className="sr-only">
                image
              </label>

              <div className="relative">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">รูปสินค้า</span>
                  </label>
                  <input
                    name="files"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleChange(e)}
                    className="file-input w-full shadow-sm "
                  />
                </div>
              </div>
            </div>
            {filePreviews.length > 0 && (
              <div className="flex flex-wrap -mx-1 mt-4 md:col-span-2">
                {filePreviews.map((preview, index) => (
                  <div key={index} className="w-1/4 p-1">
                    <img src={preview} alt={`Preview ${index}`} className="w-full h-auto max-h-20 object-fill" />
                  </div>
                ))}
              </div>
            )}


            <div className="md:col-span-2">
              <span className="text-xs sm:text-sm md:text-md font-semibold text-gray-900">🌟หมวดหมู่หลัก</span>
              <label htmlFor="category" className="sr-only">
                category
              </label>
              <div className="relative grid md:grid-cols-2">
                {categories && categories.map((item) => (
                  <div key={item._id} className="flex items-center px-5 overflow-hidden">
                    <input
                      type="radio"
                      id={item._id}
                      name="category"
                      value={item._id}
                      checked={product.category === item._id}
                      onChange={(e) => handleChangeCategory(e.target.value)}
                      className="radio radio-xs checked:bg-red-500 mr-2"
                    />
                    <label className="text-xs sm:text-sm md:text-md truncate hover:text-clip" htmlFor={item._id}>{item.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <span className="text-xs sm:text-sm md:text-md font-semibold text-gray-900">⭐หมวดหมู่รอง</span>
              <label htmlFor="subCategory" className="sr-only">
                subCategory
              </label>
              <div className="relative grid md:grid-cols-2">
                {subCategories && subCategories.map((item) => (
                  <div key={item._id} className="flex items-center px-5 overflow-hidden">
                    <input
                      type="radio"
                      id={item._id}
                      name="subCategory"
                      value={item._id}
                      checked={product.subCategory === item._id}
                      onChange={(e) => handleChangeSubCategory(e.target.value)}
                      className="radio radio-xs checked:bg-red-500 mr-2"
                    />
                    <label className="text-xs sm:text-sm md:text-md truncate hover:text-clip" htmlFor={item._id}>{item.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <span className="text-xs sm:text-sm md:text-md font-semibold text-gray-900">⚡หมวดหมู่ย่อย</span>
              <label htmlFor="subSubCategory" className="sr-only">
                subSubCategory
              </label>
              <div className="relative grid md:grid-cols-2">
                {subSubCategories && subSubCategories.map((item) => (
                  <div key={item._id} className="flex items-center px-5 overflow-hidden">
                    <input
                      type="radio"
                      id={item._id}
                      name="subSubCategory"
                      value={item._id}
                      checked={product.subSubCategory === item._id}
                      onChange={(e) => handleChangeSubSubCategory(e.target.value)}
                      className="radio radio-xs checked:bg-red-500 mr-2"
                    />
                    <label className="text-xs sm:text-sm md:text-md truncate hover:text-clip" htmlFor={item._id}>{item.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white md:col-span-2"
            >
              แก้ไขสินค้า
            </button>
          </form>
        </aside>
      </article>
    </section>
  );
};

export default EditProduct;
