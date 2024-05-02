'use client'
import React from "react";
import { URL_IMAGES } from "../../../config/constants";
import SlideProductImages from "./SlideProductImages";

const ProductModal = ({ data }) => {
  console.log(data);

  return (
    <>
      {
        data
          ?
          <section className="w-full flex flex-col overflow-hidden">
            <div className="w-full flex items-center justify-center rounded-2xl ">
              <SlideProductImages images={data.files} />

            </div>
            <div className="w-full lg:mb-1 overflow-y-auto flex-grow">
              <p className="text-[16px] md:text-xl font-bold px-10 mt-10 whitespace-normal">
                {data.name}
              </p>
              <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
              <p className="text-sm md:text-lg py-10 px-20 whitespace-normal">
                {data.description.split("\n" || "\r\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
            <div className="modal-action p-0 m-0">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn bg-red-600 text-white hover:text-red-600 hover:bg-white text-[10px] mt-0 md:text-sm mb-1 mr-1 md:mb-5 md:mr-5">
                  CLOSE
                </button>
              </form>
            </div>
          </section>
          :
          <p>ไม่มีข้อมูล</p>
      }

    </>
  );
};

export default ProductModal;
