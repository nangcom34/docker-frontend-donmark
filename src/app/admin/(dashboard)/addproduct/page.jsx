"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../config/constants";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const AddProduct = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [model, setModel] = useState("");
  const [wide, setWide] = useState("");
  const [long, setLong] = useState("");
  const [high, setHigh] = useState("");
  const [weight, setWeight] = useState("");
  const [barcode, setBarcode] = useState("");
  const [productCode, setProductCode] = useState("");


  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  useEffect(() => {
    loadCategory();
  }, []);

  useEffect(() => {
    if (category) {
      loadSubCategories();
    }
  }, [category]);

  useEffect(() => {
    if (subCategory) {
      loadSubSubCategories();
    }
  }, [subCategory]);

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
        { category: category }
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
        { subCategory: subCategory }
      );
      setSubSubCategories(response.data);
    } catch (error) {
      console.error("Error loading sub-sub-categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !files.length || !category || !subCategory || !type || !material || !model || !weight || !barcode || !productCode || !brand) {
      Swal.fire("กรุณาใส่ข้อมูลที่จำเป็นให้ครบ!!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("type", type);
    formData.append("material", material);
    formData.append("model", model);
    formData.append("weight", weight);
    formData.append("barcode", barcode);
    formData.append("productCode", productCode);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    if (subSubCategory) {
      formData.append("subSubCategory", subSubCategory);
    }
    if (wide) {
      formData.append("wide", wide);
    }
    if (long) {
      formData.append("long", long);
    }
    if (high) {
      formData.append("high", high);
    }
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }

    try {
      await axios.post(API_URL + "/product", formData);
      Swal.fire("สำเร็จ!", "เพิ่มสินค้าแล้ว!", "success");
      router.push("/admin/adminallproduct");
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถเพิ่มสินค้าได้", "error");
    }
  };

  const handleChangeCategory = (value) => {
    setCategory(value);
    setSubCategory(""); // Reset subCategory when category changes
    setSubSubCategory(""); // Reset subSubCategory when category changes
  };

  const handleChangeSubCategory = (value) => {
    setSubCategory(value);
    setSubSubCategory(""); // Reset subSubCategory when subCategory changes
  };

  const handleChangeSubSubCategory = (value) => {
    setSubSubCategory(value);
  };

  const handleChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFiles(filesArray);
    setFilePreviews(filesArray.map(file => URL.createObjectURL(file)));
  };


  return (
    <>
      <section className="flex flex-col justify-start px-5 overflow-hidden">

        <aside className="mx-auto w-full max-w-xl mb-10">
          <p className="text-center text-xl font-bold text-red-600 sm:text-2xl mt-5">
            สินค้าทั้งหมด
          </p>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            action=""
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-1"
          >
            <p className="text-center text-lg font-medium md:col-span-2">เพิ่มสินค้า</p>

            <div className="md:col-span-2">
              <label htmlFor="name" className="sr-only">
                name
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-red-500 focus:outline-red-500"
                  placeholder="ชื่อสินค้า"
                />
              </div>
            </div>

            <div>
              <label htmlFor="brand" className="sr-only">
              brand
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-red-500 focus:outline-red-500"
                  placeholder="แบรนด์"
                />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="sr-only">
                type
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-red-500 focus:outline-red-500"
                  placeholder="ประเภท"
                />
              </div>
            </div>

            <div>
              <label htmlFor="material" className="sr-only">
                material
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setMaterial(e.target.value)}
                  value={material}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-red-500 focus:outline-red-500"
                  placeholder="วัสดุที่ใช้ผลิต"
                />
              </div>
            </div>

            <div>
              <label htmlFor="model" className="sr-only">
                model
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setModel(e.target.value)}
                  value={model}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-red-500 focus:outline-red-500"
                  placeholder="รุ่น"
                />
              </div>
            </div>

            <div>
              <label htmlFor="weight" className="sr-only">
                weight
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setWeight(e.target.value)}
                  value={weight}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-red-500 focus:outline-red-500"
                  placeholder="น้ำหนัก"
                />
              </div>
            </div>

            <div>
              <label htmlFor="productCode" className="sr-only">
                productCode
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setProductCode(e.target.value)}
                  value={productCode}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-red-500 focus:outline-red-500"
                  placeholder="รหัสสินค้า"
                />
              </div>
            </div>

            <div>
              <label htmlFor="barcode" className="sr-only">
                barcode
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setBarcode(e.target.value)}
                  value={barcode}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-red-500 focus:outline-red-500"
                  placeholder="รหัสบาร์โค้ด"
                />
              </div>
            </div>

            <div>
              <label htmlFor="wide" className="sr-only">
                wide
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setWide(e.target.value)}
                  value={wide}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-red-500 focus:outline-red-500"
                  placeholder="ความกว้าง 'ไม่จำเป็น'"
                />
              </div>
            </div>

            <div>
              <label htmlFor="long" className="sr-only">
                long
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setLong(e.target.value)}
                  value={long}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-red-500 focus:outline-red-500"
                  placeholder="ความยาว 'ไม่จำเป็น'"
                />
              </div>
            </div>

            <div>
              <label htmlFor="high" className="sr-only">
                high
              </label>

              <div className="relative">
                <input
                  onChange={(e) => setHigh(e.target.value)}
                  value={high}
                  type="text"
                  className="input w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-red-500 focus:outline-red-500"
                  placeholder="ความสูง 'ไม่จำเป็น'"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="sr-only">
                description
              </label>
              <div className="relative">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  placeholder="รายละเอียด"

                  className="border-gray-200 shadow-sm bg-white rounded-lg" />
                {/* <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="textarea textarea-ghost w-full border-gray-200 p-4 pe-12 text-sm shadow-sm bg-white"
                  placeholder="รายละเอียดสินค้า"
                ></textarea> */}
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="files" className="sr-only">
                images
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
                    <img src={preview} alt={`Preview ${index}`} className="w-full h-auto max-h-20 object-fill rounded-md" />
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
                {categories.map((item) => (
                  <div key={item._id} className="flex items-center px-5 overflow-hidden">
                    <input
                      type="radio"
                      id={item._id}
                      name="category"
                      value={item._id}
                      checked={category === item._id}
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
                {subCategories.map((item) => (
                  <div key={item._id} className="flex items-center px-5 overflow-hidden">
                    <input
                      type="radio"
                      id={item._id}
                      name="subCategory"
                      value={item._id}
                      checked={subCategory === item._id}
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
                {subSubCategories.map((item) => (
                  <div key={item._id} className="flex items-center px-5 overflow-hidden">
                    <input
                      type="radio"
                      id={item._id}
                      name="subSubCategory"
                      value={item._id}
                      checked={subSubCategory === item._id}
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
              เพิ่มสินค้า
            </button>
          </form>
        </aside>

      </section>
    </>
  );
};

export default AddProduct;
