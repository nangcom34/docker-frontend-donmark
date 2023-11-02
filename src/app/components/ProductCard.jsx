import React from "react";
import Image from "next/image";
import { URL_IMAGES } from "../../../config/constants";

const ProductCard = ({ data }) => {
  //console.log(data);

  return (
    <section className="w-full">
      <div className="w-full rounded-2xl shadow-md shadow-slate-400 overflow-hidden">
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
      <div className="w-full overflow-hidden">
        <p className="text-[16px] md:text-xl font-bold px-10 mt-10 break-all">
          {data.name}
        </p>
        <p className="text-sm md:text-lg py-10 px-20 break-all">
          {data.description}
        </p>
      </div>
    </section>
  );
};

export default ProductCard;
