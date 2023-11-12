import React from "react";
import Image from "next/image";
import { URL_IMAGES } from "../../../config/constants";

const ProductCard = ({ data }) => {
  //console.log(data);

  return (
    <section className="w-full max-h-full flex flex-col overflow-hidden">
      <div className="w-full rounded-2xl shadow-md shadow-slate-400">
        <Image
          src={`${URL_IMAGES}${data.file}`}
          alt={data.name}
          width={1024}
          height={768}
          className="w-full object-cover object-center"
          style={{
            loading: "lazy",
          }}
        />
      </div>
      <div className="w-full mb-1 overflow-y-auto flex-grow">
        <p className="text-[16px] md:text-xl font-bold px-10 mt-10 break-all">
          {data.name}
        </p>
        <p className="text-sm md:text-lg py-10 px-20 break-all whitespace-pre-line">
          {data.description.split("\n" || "\r\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn bg-red-600 text-white hover:text-red-600 hover:bg-white mb-1 mr-5">
            CLOSE
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProductCard;
