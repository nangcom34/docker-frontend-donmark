"use client";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import ProductModal from "@/app/components/ProductModal";
import Header from "@/app/layouts/Header";
import Footer from "@/app/layouts/Footer";


import Navbar from "@/app/layouts/Navbar";
import { API_URL, URL_IMAGES } from "../../../../config/constants";
import SlideProductImages from "@/app/components/SlideProductImages";


const Product = ({ params }) => {
    const [loading, setLoading] = useState(true);

    const [product, setProduct] = useState();




    useEffect(() => {
        loadProduct();

    }, []);



    const loadProduct = async () => {
        setLoading(true);

        //console.log(params.id);
        await axios
            .post(API_URL + "/productone", { id: params.id })
            .then(async (res) => {
                //console.log(res.data);
                setProduct(res.data);
                setLoading(false);

            })
            .catch((error) => {
                console.log(error);
                //setLoading(false);
            });
    };



    return (
        <main className="flex flex-col min-h-screen mx-auto">
            <Header />
            <Navbar />
            {loading
                ?
                <section className='flex-grow flex items-center justify-center gap-1 font-semibold  mx-auto max-w-screen-xl'>
                    <span className="loading loading-spinner text-error h-10 w-10"></span>
                </section>
                :
                <section className='flex-grow  mx-auto max-w-screen-xl'>
                    <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6 lg:gap-8 px-5 sm:px-4 md:px-5 my-3">
                        <SlideProductImages images={product.files} />
                        <aside className="flex flex-col justify-start items-center space-y-5">
                            <div>
                                <h2 className="font-semibold mb-5">{product.name}</h2>
                                <div className="flow-root">
                                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                        {product.category
                                            ? <div className="grid gap-1 py-3 even:bg-gray-50 grid-cols-3 sm:gap-4">
                                                <dt className="text-gray-700">PRODUCT MAIN CAT</dt>
                                                <dd className="text-gray-900 font-medium col-span-2">{product.category.name}</dd>
                                            </div>
                                            : null
                                        }
                                        {product.subCategory
                                            ? <div className="grid gap-1 py-3 even:bg-gray-50 grid-cols-3 sm:gap-4">
                                                <dt className="text-gray-700">PRODUCT CATEGORY</dt>
                                                <dd className="text-gray-900 font-medium col-span-2">{product.subCategory.name}</dd>
                                            </div>
                                            : null
                                        }
                                        {product.subSubCategory
                                            ? <div className="grid gap-1 py-3 even:bg-gray-50 grid-cols-3 sm:gap-4">
                                                <dt className="text-gray-700">PRODUCT SUB CATEGORY</dt>
                                                <dd className="text-gray-900 font-medium col-span-2">{product.subSubCategory.name}</dd>
                                            </div>
                                            : null
                                        }
                                        {product.brand
                                            ? <div className="grid gap-1 py-3 even:bg-gray-50 grid-cols-3 sm:gap-4">
                                                <dt className="text-gray-700">แบรนด์</dt>
                                                <dd className="text-gray-900 font-medium col-span-2">{product.brand}</dd>
                                            </div>
                                            : null
                                        }
                                        {product.type
                                            ? <div className="grid gap-1 py-3 even:bg-gray-50 grid-cols-3 sm:gap-4">
                                                <dt className="text-gray-700">ประเภท</dt>
                                                <dd className="text-gray-900 font-medium col-span-2">{product.type}</dd>
                                            </div>
                                            : null
                                        }
                                        {product.material
                                            ? <div className="grid gap-1 py-3 even:bg-gray-50 grid-cols-3 sm:gap-4">
                                                <dt className="text-gray-700">วัสดุที่ใช้ผลิต</dt>
                                                <dd className="text-gray-900 font-medium col-span-2">{product.material}</dd>
                                            </div>
                                            : null
                                        }
                                        {product.model
                                            ? <div className="grid gap-1 py-3 even:bg-gray-50 grid-cols-3 sm:gap-4">
                                                <dt className="text-gray-700">รุ่น</dt>
                                                <dd className="text-gray-900 font-medium col-span-2">{product.model}</dd>
                                            </div>
                                            : null
                                        }
                                        {product.wide && product.wide !== "" && product.wide !== "undefined"
                                            ? <div className="grid gap-1 py-3 even:bg-gray-50 grid-cols-3 sm:gap-4">
                                                <dt className="text-gray-700">กว้าง</dt>
                                                <dd className="text-gray-900 font-medium col-span-2">{product.wide}</dd>
                                            </div>
                                            : null
                                        }
                                        {product.long && product.long !== "" && product.long !== "undefined"
                                            ? <div className="grid gap-1 py-3 even:bg-gray-50 grid-cols-3 sm:gap-4">
                                                <dt className="text-gray-700">ยาว</dt>
                                                <dd className="text-gray-900 font-medium col-span-2">{product.long}</dd>
                                            </div>
                                            : null
                                        }
                                        {product.high && product.high !== "" && product.high !== "undefined"
                                            ? <div className="grid gap-1 py-3 even:bg-gray-50 grid-cols-3 sm:gap-4">
                                                <dt className="text-gray-700">สูง</dt>
                                                <dd className="text-gray-900 font-medium col-span-2">{product.high}</dd>
                                            </div>
                                            : null
                                        }
                                        {product.weight
                                            ? <div className="grid gap-1 py-3 even:bg-gray-50 grid-cols-3 sm:gap-4">
                                                <dt className="text-gray-700">น้ำหนัก</dt>
                                                <dd className="text-gray-900 font-medium col-span-2">{product.weight}</dd>
                                            </div>
                                            : null
                                        }
                                        {product.productCode
                                            ? <div className="grid gap-1 py-3 even:bg-gray-50 grid-cols-3 sm:gap-4">
                                                <dt className="text-gray-700">มอก.</dt>
                                                <dd className="text-gray-900 font-medium col-span-2">{product.productCode}</dd>
                                            </div>
                                            : null
                                        }
                                        {product.barcode
                                            ? <div className="grid gap-1 py-3 even:bg-gray-50 grid-cols-3 sm:gap-4">
                                                <dt className="text-gray-700">รหัสบาร์โค้ด</dt>
                                                <dd className="text-gray-900 font-medium col-span-2">{product.barcode}</dd>
                                            </div>
                                            : null
                                        }

                                    </dl>
                                </div>
                            </div>
                            <div className="flex items-center justify-center flex-grow space-x-5">
                                <Link
                                    href={"https://page.line.me/donmark"}
                                    target="_blank"
                                    className=""
                                >
                                    <img
                                        src={`/images/lineC.png`}
                                        alt="line"
                                        className="w-8 md:w-11 h-auto hover:scale-125 duration-300"
                                        loading="lazy" />
                                </Link>
                                <Link
                                    href={"https://www.facebook.com/donmarkOfficial/"}
                                    target="_blank"
                                    className=""
                                >
                                    <img
                                        src={`/images/fbC.png`}
                                        alt="facebook"
                                        className="w-8 md:w-11 h-auto hover:scale-125 duration-300"
                                        loading="lazy" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                    <div className="flex flex-col px-5 sm:px-4 md:px-10 mt-8" dangerouslySetInnerHTML={{ __html: product.description }}>

                    </div>
                    <div className="flex items-center justify-start space-x-5 px-5 sm:px-4 md:px-10 mt-3 mb-5">
                        <Link
                            href={"https://page.line.me/donmark"}
                            target="_blank"
                            className=""
                        >
                            <img
                                src={`/images/lineC.png`}
                                alt="line"
                                className="w-9 md:w-11 h-auto hover:scale-125 duration-300"
                                loading="lazy" />
                        </Link>
                        <Link
                            href={"https://www.facebook.com/donmarkOfficial/"}
                            target="_blank"
                            className=""
                        >
                            <img
                                src={`/images/fbC.png`}
                                alt="facebook"
                                className="w-9 md:w-11 h-auto hover:scale-125 duration-300"
                                loading="lazy" />
                        </Link>
                    </div>
                </section>
            }

            <Footer />
        </main >
    );
};

export default Product;
