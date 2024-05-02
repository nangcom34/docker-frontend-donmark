"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../../config/constants";

const EditSubCategory = ({ params }) => {
    const router = useRouter();
    const [subCategory, setSubCategory] = useState({
        name: "",
        category: "",
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategory();
        axios
            .get(API_URL + "/subCategory/" + params.id)
            .then((res) => {
                setSubCategory(res.data);
            })
            .catch((error) => console.log("error", error));
    }, []);

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

    // console.log(product);
    const { name } = subCategory;

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(product);

        await axios
            .put(API_URL + "/subCategory/" + params.id, subCategory)
            .then((res) => {
                Swal.fire("สำเร็จ!", "แก้ไขหมวดหมู่สินค้าแล้ว!", "success");
                router.push("/admin/admincategory");
            })
            .catch((error) => console.log(error));
    };

    return (
        <section className="flex flex-col justify-start px-5">
            <article className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
                <aside className="mx-auto w-full max-w-lg">
                    <p className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                        หมวดหมู่สินค้า
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        action=""
                        className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
                    >
                        <p className="text-center text-lg font-medium">⭐หมวดหมู่รอง</p>

                        <div>
                            <label htmlFor="category" className="sr-only">
                                category
                            </label>
                            <div className="relative">
                                <select
                                    onChange={(e) => {
                                        setSubCategory((subCategory) => ({
                                            ...subCategory,
                                            category: e.target.value,
                                        }));
                                    }}

                                    className="select select-primary w-full h-14 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    value={subCategory.category}
                                >
                                    <option disabled selected>
                                        เลือกหมวดหมู่
                                    </option>
                                    {categories.length > 0 &&
                                        categories.map((item) => (
                                            <option key={item._id} value={item._id}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="name" className="sr-only">
                                name
                            </label>

                            <div className="relative">
                                <input
                                    onChange={(e) => {
                                        setSubCategory((subCategory) => ({
                                            ...subCategory,
                                            name: e.target.value,
                                        }));
                                    }}
                                    value={name}
                                    type="text"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="หมวดหมู่รอง"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            แก้ไขหมวดหมู่รอง
                        </button>
                    </form>
                </aside>
            </article>
        </section>
    );
};

export default EditSubCategory;
