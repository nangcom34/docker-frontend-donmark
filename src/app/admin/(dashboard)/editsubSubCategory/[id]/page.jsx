"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../../config/constants";

const EditSubSubCategory = ({ params }) => {
    const router = useRouter();
    const [subSubCategory, setSubSubCategory] = useState({
        name: "",
        subCategory: "",
    });
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        loadSubCategory();
        axios
            .get(API_URL + "/subSubCategory/" + params.id)
            .then((res) => {
                setSubSubCategory(res.data);
            })
            .catch((error) => console.log("error", error));
    }, []);

    const loadSubCategory = async () => {
        await axios
            .get(API_URL + "/subCategory")
            .then((res) => {
                setSubCategories(res.data);
                //console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // console.log(product);
    const { name } = subSubCategory;

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(product);

        await axios
            .put(API_URL + "/subSubCategory/" + params.id, subSubCategory)
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
                        <p className="text-center text-lg font-medium">⚡หมวดหมู่ย่อย</p>

                        <div>
                            <label htmlFor="subSubCategory" className="sr-only">
                                subSubCategory
                            </label>
                            <div className="relative">
                                <select
                                    onChange={(e) => {
                                        setSubSubCategory((subSubCategory) => ({
                                            ...subSubCategory,
                                            subCategory: e.target.value,
                                        }));
                                    }}

                                    className="select select-primary w-full h-14 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    value={subSubCategory.subCategory}
                                >
                                    <option disabled selected>
                                        เลือกหมวดหมู่
                                    </option>
                                    {subCategories.length > 0 &&
                                        subCategories.map((item) => (
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
                                        setSubSubCategory((subSubCategory) => ({
                                            ...subSubCategory,
                                            name: e.target.value,
                                        }));
                                    }}
                                    value={name}
                                    type="text"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="หมวดหมู่ย่อย"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            แก้ไขหมวดหมู่ย่อย
                        </button>
                    </form>
                </aside>
            </article>
        </section>
    );
};

export default EditSubSubCategory;
