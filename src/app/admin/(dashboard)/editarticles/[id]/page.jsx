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

const EditArticle = ({ params }) => {
    const router = useRouter();
    const [article, setArticle] = useState({
        title: "",
        description: "",
        images: [],
    });
    const [filePreviews, setFilePreviews] = useState([]);

    const [fileOld, setFileOld] = useState([]);

    useEffect(() => {
        axios
            .get(API_URL + "/articles/" + params.id)
            .then((res) => {
                setArticle(res.data)
                setFileOld(res.data.images);
            })
            .catch((error) => console.log("error", error));
    }, []);



    const { title, description } = article;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(fileOld);


        const formData = new FormData();

        formData.append("title", article.title);
        formData.append("description", article.description);
        if (article.files && article.files.length > 0) {
            for (let i = 0; i < article.files.length; i++) {
                formData.append("files", article.files[i]);
            }
        }
        article.images.forEach((image) => {
            formData.append("images", image);
        });

        fileOld.forEach((oldImage) => {
            formData.append("fileOld", oldImage);

        });
        //console.log(formData);

        await axios
            .put(API_URL + "/articles/" + params.id, formData)
            .then((res) => {
                Swal.fire("สำเร็จ!", "แก้ไข articles แล้ว!", "success");
                router.back()
            })
            .catch((error) => console.log(error));

    };
    const handleChange = (e) => {

        if (e.target.name === "files") {
            const filesArray = Array.from(e.target.files);
            setArticle({ ...article, [e.target.name]: filesArray });
            setFilePreviews(filesArray.map(file => URL.createObjectURL(file)));
        }
    };

    return (
        <section className="flex flex-col justify-start px-5">
            <article className="mx-auto w-full px-4 py-16 sm:px-6 lg:px-8">
                <aside className="mx-auto w-full max-w-lg">
                    <p className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                    บทความ
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        action=""
                        className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
                    >
                        <p className="text-center text-lg font-medium">
                            บทความ
                        </p>

                        <div>
                            <label htmlFor="title" className="sr-only">
                                title
                            </label>

                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setArticle((article) => ({
                                            ...article,
                                            title: e.target.value,
                                        }));
                                    }}
                                    value={title}
                                    className="textarea textarea-ghost w-full border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="หัวข้อย่อย"
                                ></input>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="sr-only">
                                description
                            </label>

                            <div className="relative">
                                <ReactQuill
                                    theme="snow"
                                    placeholder="รายละเอียด"
                                    onChange={(content, delta, source, editor) => {
                                        setArticle((article) => ({
                                            ...article,
                                            description: content,
                                        }));
                                    }}
                                    value={description}
                                    className="border-gray-200 shadow-sm "
                                />
                                {/* <textarea
                                    onChange={(e) => {
                                        setArticle((article) => ({
                                            ...article,
                                            description: e.target.value,
                                        }));
                                    }}
                                    value={description}
                                    className="textarea textarea-ghost w-full border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="รายละเอียดบทความ"
                                ></textarea> */}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="files" className="sr-only">
                                images
                            </label>

                            <div className="relative">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">รูป</span>
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
                            <div className="flex flex-wrap -mx-1 mt-4">
                                {filePreviews.map((preview, index) => (
                                    <div key={index} className="w-1/4 px-1">
                                        <img src={preview} alt={`Preview ${index}`} className="w-full h-auto max-h-20 object-fill" />
                                    </div>
                                ))}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            แก้ไขบทความ
                        </button>
                    </form>
                </aside>
            </article>
        </section>
    );
};

export default EditArticle;
