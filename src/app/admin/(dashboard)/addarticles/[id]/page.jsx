"use client";
import React, { useEffect, useState } from "react";

import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { API_URL } from "../../../../../../config/constants";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AddArticles = ({ params }) => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]);
    const [topic, setTopic] = useState("");
    const [topics, setTopics] = useState([]);


    useEffect(() => {
        loadTopics();
    }, []);

    const loadTopics = async () => {
        try {
            const response = await axios.get(API_URL + "/topics/" + params.id);
            setTopics(response.data);
            setTopic(response.data._id)
            //console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!topic) {
            Swal.fire("มีบ้างอย่างผิดพลาด!!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("topics", topic);
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
        }

        try {
            await axios.post(API_URL + "/articles", formData);
            Swal.fire("สำเร็จ!", "เพิ่มรายละเอียดแล้ว!", "success");
            router.push("/admin/adminarticles/" + params.id);
        } catch (error) {
            console.error("Error adding article:", error);
            Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถเพิ่มบทความได้", "error");
        }
    };


    const handleChange = (e) => {
        const filesArray = Array.from(e.target.files);
        setFiles(filesArray);
        setFilePreviews(filesArray.map(file => URL.createObjectURL(file)));
    };


    return (
        <section className="flex flex-col justify-start px-5">
            <article className="mx-auto w-full px-4 py-16 sm:px-6 lg:px-8">
                <aside className="mx-auto w-full max-w-xl">
                    <p className="text-center text-2xl font-bold text-red-600 sm:text-3xl">
                        รายละเอียดบทความ
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        action=""
                        className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white overflow-y-auto"
                    >
                        <p className="text-center text-lg font-medium">เพิ่มบทความ</p>

                        <div>
                            <span className="text-xs sm:text-sm md:text-md font-semibold text-gray-900">หัวข้อบทความ</span>
                            <label htmlFor="topic" className="sr-only">
                                topic
                            </label>
                            <div className="relative px-5">
                                <p className="text-xs sm:text-sm md:text-md text-gray-900 truncate hover:text-clip">{topics.title}</p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="title" className="sr-only">
                                title
                            </label>

                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    className="textarea textarea-ghost w-full border-gray-200 p-4 pe-12 text-sm shadow-sm bg-white"
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
                                    value={description}
                                    onChange={setDescription}
                                    placeholder="รายละเอียด" 
                                   
                                    className="border-gray-200 shadow-sm bg-white rounded-lg"/>
                                {/* <textarea
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    className="textarea textarea-ghost w-full border-gray-200 p-4 pe-12 text-sm shadow-sm bg-white"
                                    placeholder="รายละเอียด"
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
                            เพิ่มรายละเอียดบทความ
                        </button>
                    </form>
                </aside>
            </article>
        </section>
    );
};

export default AddArticles;
