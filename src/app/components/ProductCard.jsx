import React from "react";
import { URL_IMAGES } from "../../../config/constants";

const ProductCard = ({ data }) => {
  //console.log(data);

  return (
    <section className="w-full flex flex-col overflow-hidden">
      <div className="w-full flex items-center justify-center rounded-2xl ">
        <img
          src={`${URL_IMAGES}${data.file}`}
          alt={data.name}
          className="w-auto h-auto max-h-[45vh] object-cover object-center rounded-2xl shadow-md shadow-slate-400 sm:mt-5 md:mt-10"
          loading="lazy"
        />
      </div>
      <div className="w-full lg:mb-1 overflow-y-auto flex-grow">
        <p className="text-[16px] md:text-xl font-bold px-10 mt-10 whitespace-normal">
          {data.name}
        </p>
        <p className="text-sm md:text-lg py-10 px-20 whitespace-normal">
          {data.description.split("\n" || "\r\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
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
  );
};

export default ProductCard;
