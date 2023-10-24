import Image from "next/image";
import React from "react";

const NoResult = () => {
  return (
    <div className="text-center space-y-4">
      <Image
        src="/assets/no-result.png"
        width={500}
        height={300}
        alt="image"
        className="aspect-auto w-full"
      />
      <h2 className="font-semibold text-2xl">Ups Tidak Ada Hasil</h2>
      <p className="text-slate-600">
        Silahkan mencari dengan pencarian lainnya
      </p>
    </div>
  );
};

export default NoResult;
